"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What is Nano Banana?",
    answer:
      "It's a revolutionary AI image editing model that transforms photos using natural language prompts. Nano Banana offers superior performance with exceptional consistency in character editing and scene preservation.",
  },
  {
    id: 2,
    question: "How does it work?",
    answer:
      'Simply upload an image and describe your desired edits in natural language. The AI understands complex instructions like "place the creature in a snowy mountain" and processes your text prompt to generate perfectly edited images.',
  },
  {
    id: 3,
    question: "What types of edits can it handle?",
    answer:
      "The editor handles complex edits including face completion, background changes, object placement, style transfers, and character modifications. It excels at understanding contextual instructions while maintaining photorealistic quality.",
  },
  {
    id: 4,
    question: "Can I use it for commercial projects?",
    answer:
      "Yes! It's perfect for creating AI UGC content, social media campaigns, and marketing materials. Many users leverage it for creating consistent AI influencers and product photography.",
  },
  {
    id: 5,
    question: "How fast is the processing?",
    answer:
      "Most images are processed in less than 1 second. Our optimized neural engine delivers lightning-fast results without compromising on quality or accuracy.",
  },
  {
    id: 6,
    question: "What file formats are supported?",
    answer:
      "We support PNG, JPG, and WebP formats. Maximum file size is 10MB. For best results, use high-quality source images.",
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-foreground/60 text-lg">Everything you need to know about Nano Banana</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <Card key={faq.id} className="overflow-hidden">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-accent/5 transition"
            >
              <h3 className="font-semibold text-foreground text-left">{faq.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-foreground/60 flex-shrink-0 ml-4 transition ${
                  openId === faq.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {openId === faq.id && (
              <div className="px-6 pb-6 border-t border-border">
                <p className="text-foreground/70">{faq.answer}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
