import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LandingTestimonials() {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "DeFi Trader",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "LUKSO Grid Signal has transformed how I share my trading insights. The Universal Profile integration makes it seamless to build my reputation.",
    },
    {
      name: "Sarah Chen",
      role: "Crypto Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The analytics dashboard provides incredible insights into my trading performance. I love how everything is tied to my Universal Profile.",
    },
    {
      name: "Michael Rodriguez",
      role: "Community Leader",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The governance features are game-changing. Being able to use LSP7 tokens for community validation creates real accountability.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
