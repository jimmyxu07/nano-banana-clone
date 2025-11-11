"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

export default function Editor() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section id="editor" className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-primary text-sm font-semibold mb-2">GET STARTED</div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Try The AI Editor</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of nano-banana's natural language image editing. Transform any photo with simple text
            commands
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border-2 border-yellow-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl">⚙️</div>
              <h3 className="text-xl font-bold text-foreground">Prompt Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Transform your image with AI-powered editing</p>

            {/* Image Upload Area */}
            <div
              className="border-2 border-dashed border-yellow-300 rounded-lg p-8 mb-6 cursor-pointer hover:bg-yellow-50 transition"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {image ? (
                <div className="flex flex-col items-center">
                  <img src={image || "/placeholder.svg"} alt="Uploaded" className="max-h-40 rounded-lg mb-3" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setImage(null)
                    }}
                    className="text-sm text-primary hover:text-primary/80 transition"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">Add Image</p>
                  <p className="text-sm text-muted-foreground">Max 50MB</p>
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <span>💬</span>
                Main Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city powered by nano technology, golden hour lighting, ultra detailed..."
                className="w-full h-24 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
              />
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold">
              Generate Now
            </Button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-yellow-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl">🎨</div>
              <h3 className="text-xl font-bold text-foreground">Output Gallery</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Your ultra-fast AI creations appear here instantly</p>

            <div className="flex flex-col items-center justify-center h-64 bg-yellow-50 rounded-lg border border-dashed border-yellow-200">
              <ImageIcon className="w-16 h-16 text-yellow-300 mb-3 opacity-50" />
              <p className="font-semibold text-foreground mb-1">Ready for instant generation</p>
              <p className="text-sm text-muted-foreground text-center">Enter your prompt and unleash the power</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
