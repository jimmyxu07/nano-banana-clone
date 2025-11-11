export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "One-shot Editing",
      description: "Edit images with a single prompt, no complex workflows needed.",
    },
    {
      icon: "🖼️",
      title: "Multi-image Support",
      description: "Process multiple images at once with consistent styling.",
    },
    {
      icon: "💬",
      title: "Natural Language",
      description: "Write prompts in plain English, no technical knowledge required.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
