"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does Nano Banana differ from other AI image editors?",
      answer:
        "Nano Banana uses advanced AI models specifically trained for character consistency and scene preservation. Unlike other tools, it maintains character integrity across multiple edits and delivers superior quality with natural language prompts.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support all common image formats including PNG, JPG, WebP, and GIF. Maximum file size is 50MB, and recommended minimum resolution is 512x512 pixels.",
    },
    {
      question: "How long does image generation typically take?",
      answer:
        "Most images are generated within 5-30 seconds depending on complexity and current server load. Our infrastructure is optimized for speed without compromising quality.",
    },
    {
      question: "Can I use generated images commercially?",
      answer:
        "Yes! With a Nano Banana subscription, all images you generate are yours to use commercially. Pro and Enterprise plans include full commercial rights.",
    },
    {
      question: "What is the pricing model?",
      answer:
        "We offer a free tier with limited generations, a Pro plan at $29/month for unlimited usage, and custom Enterprise plans for teams. No credit card required for the free tier.",
    },
    {
      question: "Is there an API for developers?",
      answer:
        "Yes! We provide a comprehensive REST API for developers. Check our API documentation to integrate Nano Banana into your applications.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-center text-muted-foreground mb-12">Everything you need to know about Nano Banana</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden hover:border-primary transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-yellow-50 transition text-left"
              >
                <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-yellow-50 border-t border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
