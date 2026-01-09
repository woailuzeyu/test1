import { NextResponse } from "next/server"

const API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations"

export async function POST(request: Request) {
  const apiKey = process.env.ARK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Missing ARK_API_KEY." }, { status: 500 })
  }

  let payload: {
    model?: string
    prompt?: string
    sequential_image_generation?: string
    sequential_image_generation_options?: {
      max_images?: number
    }
    response_format?: string
    size?: string
    stream?: boolean
    watermark?: boolean
    optimize_prompt_options?: {
      mode?: string
    }
    image?: string | string[]
  }

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  if (!payload.prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 })
  }

  const upstream = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: payload.model ?? "doubao-seedream-4-5-251128",
      prompt: payload.prompt,
      image: payload.image,
      sequential_image_generation: payload.sequential_image_generation ?? "disabled",
      sequential_image_generation_options: payload.sequential_image_generation_options,
      response_format: payload.response_format ?? "url",
      size: payload.size ?? "2K",
      stream: false,
      watermark: payload.watermark ?? true,
      optimize_prompt_options: payload.optimize_prompt_options,
    }),
  })

  if (!upstream.ok) {
    const errorText = await upstream.text()
    return NextResponse.json({ error: errorText || "Upstream error." }, { status: upstream.status })
  }

  const data = await upstream.json()

  if (data?.error?.message) {
    return NextResponse.json({ error: data.error.message }, { status: 502 })
  }

  const image = data?.data?.[0]
  if (image?.error?.message) {
    return NextResponse.json({ error: image.error.message }, { status: 502 })
  }
  const imageUrl = image?.url ?? null
  const b64 = image?.b64_json ?? null

  if (!imageUrl && !b64) {
    return NextResponse.json({ error: "Image payload not found in response." }, { status: 502 })
  }

  return NextResponse.json({ imageUrl, b64 })
}
