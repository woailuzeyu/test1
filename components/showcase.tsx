import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const showcaseItems = [
  {
    id: 1,
    title: "Mountain Landscape",
    description: "Created in 0.8 seconds with Nano Banana",
    image: "/mountain-sunset.png",
    speed: "0.8s",
  },
  {
    id: 2,
    title: "Garden Scene",
    description: "Complex scene rendered in milliseconds",
    image: "/lush-garden-with-flowers-and-fountain.jpg",
    speed: "0.5s",
  },
  {
    id: 3,
    title: "Beach Sunset",
    description: "Photorealistic results at lightning speed",
    image: "/tropical-beach-with-palm-trees-sunset.jpg",
    speed: "0.6s",
  },
  {
    id: 4,
    title: "Aurora Borealis",
    description: "Advanced effects processed instantly",
    image: "/northern-lights-aurora-borealis-night-sky.jpg",
    speed: "0.7s",
  },
]

export default function Showcase() {
  return (
    <section id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Lightning-Fast AI Creations</h2>
        <p className="text-foreground/60 text-lg">See what Nano Banana generates in milliseconds</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showcaseItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition group cursor-pointer">
            <div className="relative overflow-hidden h-64 bg-foreground/5">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <div className="inline-block bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full mb-2 w-fit">
                  ⚡ {item.speed}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-foreground/60">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-foreground/60 mb-4">Ready for instant generation?</p>
        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold px-8">
          Try Nano Banana Generator
        </Button>
      </div>
    </section>
  )
}
