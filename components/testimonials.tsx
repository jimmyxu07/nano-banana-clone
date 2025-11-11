export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Creative Director",
      content: "Nano Banana has completely transformed my workflow. The consistency is unmatched.",
      avatar: "👨‍🎨",
    },
    {
      name: "Sarah Johnson",
      role: "Graphic Designer",
      content: "Finally, an AI tool that understands what I want to create. Simply amazing.",
      avatar: "👩‍🎨",
    },
    {
      name: "Marcus Lee",
      role: "Content Creator",
      content: "The speed and quality have saved me countless hours. Highly recommended!",
      avatar: "👨‍💼",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">Loved by Creators</h2>
        <p className="text-lg text-center text-muted-foreground mb-12">What our users have to say</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white border border-border rounded-xl p-8 hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
