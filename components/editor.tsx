"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Loader2, Download } from "lucide-react"

export default function Editor() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generatedText, setGeneratedText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Parse AI response to extract image and text
  const parseAIResponse = (response: string) => {
    // Look for markdown image syntax: ![alt](data:image/...)
    const imageRegex = /!\[.*?\]\(data:image\/[^)]+\)/g
    const imageMatches = response.match(imageRegex)

    if (imageMatches && imageMatches.length > 0) {
      // Extract the data URL from the first match
      const dataUrlMatch = imageMatches[0].match(/\(data:image\/[^)]+\)/)
      if (dataUrlMatch) {
        const imageUrl = dataUrlMatch[0].slice(1, -1) // Remove parentheses
        const textWithoutImage = response.replace(imageRegex, '').trim()

        return {
          image: imageUrl,
          text: textWithoutImage || null
        }
      }
    }

    // If no image found, treat the whole response as text
    return {
      image: null,
      text: response
    }
  }

  const downloadImage = (imageUrl: string, filename: string = 'generated-image.png') => {
    try {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
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
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const handleGenerate = async () => {
    if (!imageFile || !prompt.trim()) {
      setError('Please upload an image and enter a prompt')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('prompt', prompt.trim())

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Failed to generate image')
      }

      if (result.success) {
        // Parse the AI response to extract image and text
        const parsedResponse = parseAIResponse(result.response)
        setGeneratedImage(parsedResponse.image)
        setGeneratedText(parsedResponse.text)
      } else {
        throw new Error('Failed to generate image')
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsGenerating(false)
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

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={!imageFile || !prompt.trim() || isGenerating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Now'
              )}
            </Button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-yellow-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl">🎨</div>
              <h3 className="text-xl font-bold text-foreground">Output Gallery</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Your ultra-fast AI creations appear here instantly</p>

            <div className="min-h-64">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64 bg-yellow-50 rounded-lg border border-dashed border-yellow-200">
                  <Loader2 className="w-16 h-16 text-yellow-400 mb-3 animate-spin" />
                  <p className="font-semibold text-foreground mb-1">Processing your image...</p>
                  <p className="text-sm text-muted-foreground text-center">AI is working its magic</p>
                </div>
              ) : (generatedImage || generatedText) ? (
                <div className="space-y-4">
                  {generatedImage && (
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <h4 className="font-semibold text-foreground mb-2">Generated Image:</h4>
                      <img
                        src={generatedImage}
                        alt="AI generated image"
                        className="w-full rounded-lg max-h-96 object-contain"
                      />
                    </div>
                  )}
                  {generatedText && (
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <h4 className="font-semibold text-foreground mb-2">AI Response:</h4>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{generatedText}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setGeneratedImage(null)
                        setGeneratedText(null)
                      }}
                    >
                      Clear Result
                    </Button>
                    {generatedText && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedText)
                        }}
                      >
                        Copy Text
                      </Button>
                    )}
                    {generatedImage && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadImage(generatedImage, 'nano-banana-generated.png')}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download Image
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-yellow-50 rounded-lg border border-dashed border-yellow-200">
                  <ImageIcon className="w-16 h-16 text-yellow-300 mb-3 opacity-50" />
                  <p className="font-semibold text-foreground mb-1">Ready for instant generation</p>
                  <p className="text-sm text-muted-foreground text-center">Upload an image and enter your prompt</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
