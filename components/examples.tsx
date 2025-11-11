export default function Examples() {
  const examples = [
    {
      title: "Character Design",
      description: "Consistent character editing across multiple poses",
      emoji: "👤",
    },
    {
      title: "Scene Transformation",
      description: "Transform entire scenes while preserving composition",
      emoji: "🌄",
    },
    {
      title: "Style Transfer",
      description: "Apply artistic styles to your photos instantly",
      emoji: "🎭",
    },
    {
      title: "Background Editing",
      description: "Replace and enhance backgrounds seamlessly",
      emoji: "🌅",
    },
  ]

  return (
    <section id="examples" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">Showcase</h2>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          See what's possible with Nano Banana's advanced AI capabilities
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {examples.map((example) => (
            <div
              key={example.title}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{example.emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{example.title}</h3>
              <p className="text-muted-foreground">{example.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
