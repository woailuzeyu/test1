"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRef, useState } from "react"

export default function EditorDemo() {
  const [image, setImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState("doubao-seedream-4-5-251128")
  const [size, setSize] = useState("2K")
  const [customSize, setCustomSize] = useState("")
  const [responseFormat, setResponseFormat] = useState("url")
  const [watermark, setWatermark] = useState(true)
  const [sequentialImageGeneration, setSequentialImageGeneration] = useState("disabled")
  const [maxImages, setMaxImages] = useState(4)
  const [optimizePromptMode, setOptimizePromptMode] = useState("standard")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!prompt) return
    setIsLoading(true)
    setError(null)
    setGeneratedImage(null)
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt,
          image,
          sequential_image_generation: sequentialImageGeneration,
          sequential_image_generation_options:
            sequentialImageGeneration === "auto" ? { max_images: maxImages } : undefined,
          response_format: responseFormat,
          size: customSize.trim() ? customSize.trim() : size,
          stream: false,
          watermark,
          optimize_prompt_options: { mode: optimizePromptMode },
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || "Failed to generate image.")
      }

      const data = await response.json()
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl as string)
      } else if (data.b64) {
        setGeneratedImage(`data:image/png;base64,${data.b64}`)
      } else {
        throw new Error("Image payload not found in response.")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI-Powered Image Editing</h2>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Upload an image and describe your desired edits. Our AI handles the rest instantly.
        </p>
      </div>

      <Card className="bg-gradient-to-b from-white to-accent/5 border border-border p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Upload Area */}
          <div className="space-y-6">
            <div
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50/50 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-4xl mb-2">📸</div>
              <p className="font-semibold text-foreground mb-2">Upload your image</p>
              <p className="text-sm text-foreground/60">PNG, JPG, WebP up to 10MB</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {image && (
              <button
                type="button"
                onClick={() => setPreviewImage(image)}
                className="relative w-full rounded-xl overflow-hidden border border-border bg-white"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt="Uploaded"
                  className="w-full max-h-72 object-contain"
                />
              </button>
            )}

            {generatedImage && (
              <button
                type="button"
                onClick={() => setPreviewImage(generatedImage)}
                className="relative w-full rounded-xl overflow-hidden border border-border bg-white"
              >
                <img src={generatedImage} alt="Generated" className="w-full max-h-72 object-contain" />
              </button>
            )}
          </div>

          {/* Prompt Area */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Describe your edits</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Place the person in a snowy mountain landscape' or 'Change the background to a beach sunset'"
                className="w-full h-32 px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-foreground">
                Model
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                >
                  <option value="doubao-seedream-4-5-251128">doubao-seedream-4-5-251128</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-foreground">
                Size
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                >
                  <option value="2K">2K</option>
                  <option value="4K">4K</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-foreground">
                Response Format
                <select
                  value={responseFormat}
                  onChange={(e) => setResponseFormat(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                >
                  <option value="url">url</option>
                  <option value="b64_json">b64_json</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-foreground">
                Sequence
                <select
                  value={sequentialImageGeneration}
                  onChange={(e) => setSequentialImageGeneration(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                >
                  <option value="disabled">disabled</option>
                  <option value="auto">auto</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-foreground">
                Custom Size
                <input
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder="2048x2048"
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                />
              </label>
              <label className="text-sm font-semibold text-foreground">
                Optimize Prompt
                <select
                  value={optimizePromptMode}
                  onChange={(e) => setOptimizePromptMode(e.target.value)}
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                >
                  <option value="standard">standard</option>
                  <option value="fast">fast</option>
                </select>
              </label>
            </div>

            {sequentialImageGeneration === "auto" && (
              <label className="text-sm font-semibold text-foreground">
                Max Images (auto)
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={maxImages}
                  onChange={(e) => setMaxImages(Number(e.target.value))}
                  className="mt-2 w-full h-10 px-3 rounded-lg border border-border bg-white text-foreground"
                />
              </label>
            )}

            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <input
                type="checkbox"
                checked={watermark}
                onChange={(e) => setWatermark(e.target.checked)}
                className="h-4 w-4"
              />
              Enable watermark
            </label>

            <Button
              onClick={handleGenerate}
              disabled={!prompt || isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 h-12 font-semibold disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate with AI"}
            </Button>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-white rounded border border-border">✨ Fast</div>
              <div className="p-2 bg-white rounded border border-border">🎯 Accurate</div>
              <div className="p-2 bg-white rounded border border-border">🔄 Quality</div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl bg-white">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
