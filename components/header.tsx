import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-3xl">🍌</div>
          <span className="text-xl font-bold text-foreground">Nano Banana</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#editor" className="text-sm text-foreground hover:text-primary transition">
            Image Editor
          </a>
          <a href="#examples" className="text-sm text-foreground hover:text-primary transition">
            Showcase
          </a>
          <a href="#faq" className="text-sm text-foreground hover:text-primary transition">
            FAQ
          </a>
          <a href="#pricing" className="text-sm text-foreground hover:text-primary transition">
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-foreground">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Launch Now</Button>
        </div>

        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  )
}
