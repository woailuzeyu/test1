import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Digital Creator",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of other solutions!",
    rating: 5,
    avatar: "👨‍💻",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UGC Specialist",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    rating: 5,
    avatar: "👩‍🎨",
  },
  {
    id: 3,
    name: "Marcus Thompson",
    role: "Professional Editor",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    rating: 5,
    avatar: "👨‍🔧",
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Content Producer",
    content: "The speed is unbelievable. I can process images in seconds instead of minutes. Game changer!",
    rating: 5,
    avatar: "👩‍💼",
  },
]

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent to-accent/10 rounded-3xl"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Loved by Creators</h2>
        <p className="text-foreground/60 text-lg">See what creators are saying about Nano Banana</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 flex flex-col justify-between">
            <div>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-foreground mb-6">{review.content}</p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{review.avatar}</span>
              <div>
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-foreground/60">{review.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
