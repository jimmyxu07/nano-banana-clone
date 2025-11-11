"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      <div className="absolute top-20 left-10 text-6xl opacity-60 animate-float">🍌</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-60 animate-float" style={{ animationDelay: "1s" }}>
        🍌
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block bg-yellow-50 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary/20">
          🍌 The AI model that outperforms Flux Kontext
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">Nano Banana</h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
          Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
            Start Editing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-primary text-primary hover:bg-yellow-50 bg-transparent"
          >
            View Examples
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span>One-shot editing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🖼️</span>
            <span>Multi-image support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <span>Natural language</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
