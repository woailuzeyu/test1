import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="text-center space-y-8">
        {/* Badge */}
        <div className="inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200">
            🍌 AI Image Editor
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Transform Images with{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Natural Language
            </span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Nano Banana's advanced AI model delivers consistent character editing and scene preservation that surpasses
            other solutions. Edit any image with simple text prompts.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 h-12 px-8 font-semibold text-base flex items-center gap-2">
            Start Editing
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="h-12 px-8 font-semibold text-base bg-transparent">
            View Examples
          </Button>
        </div>

        {/* Floating banana decorations */}
        <div className="pt-12 relative h-32 flex justify-center items-center">
          <div className="absolute text-6xl opacity-30 animate-bounce" style={{ animation: "bounce 3s infinite" }}>
            🍌
          </div>
          <div className="absolute text-5xl opacity-20 animate-bounce" style={{ animation: "bounce 4s infinite 1s" }}>
            🍌
          </div>
          <div className="absolute text-4xl opacity-15 animate-bounce" style={{ animation: "bounce 5s infinite 2s" }}>
            🍌
          </div>
        </div>
      </div>
    </section>
  )
}
