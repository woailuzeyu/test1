import Header from "@/components/header"
import Footer from "@/components/footer"
import FAQ from "@/components/faq"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/server"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Explore the editor with a tiny daily allowance.",
    badge: null,
    href: "/",
    cta: "Start for free",
    highlight: false,
    external: false,
    features: [
      "10 credits per day",
      "Standard image quality",
      "Community presets",
      "Personal projects only",
    ],
  },
  {
    name: "Creator",
    price: "$12",
    period: "per month",
    description: "Best for creators shipping weekly content.",
    badge: "Most popular",
    href: "https://www.paypal.com/ncp/payment/FK6FVJQ6UG53Q",
    cta: "Pay with PayPal",
    highlight: true,
    external: true,
    features: [
      "1,200 credits monthly",
      "HD exports + batch mode",
      "Commercial usage license",
      "Priority GPU queue",
    ],
  },
  {
    name: "Studio",
    price: "$39",
    period: "per month",
    description: "For teams running steady creative pipelines.",
    badge: "Best value",
    href: "mailto:hello@nanobanana.ai",
    cta: "Talk to sales",
    highlight: false,
    external: true,
    features: [
      "4,500 credits monthly",
      "Shared team workspace",
      "Brand style locks",
      "Dedicated support channel",
    ],
  },
]

const creditPerks = [
  {
    title: "Credits never feel like tokens",
    detail: "1 credit ≈ 1 second of GPU time. Simple, predictable, fast.",
  },
  {
    title: "Roll over in slow months",
    detail: "Unused credits carry for 30 days so you can binge later.",
  },
  {
    title: "Commercial rights baked in",
    detail: "Publish client work with confidence on paid tiers.",
  },
]

const usageHighlights = [
  {
    title: "Portrait edits",
    detail: "2-4 credits per render",
  },
  {
    title: "Scene relights",
    detail: "4-8 credits per render",
  },
  {
    title: "Full restyles",
    detail: "8-12 credits per render",
  },
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header user={data.user} />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.35),transparent_65%)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-10%] top-[15%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.25),transparent_70%)] blur-2xl" />

        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-100/60 px-4 py-1 text-sm font-semibold text-yellow-800">
            Transparent pricing. Zero surprise fees.
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight animate-[fade-up_0.6s_ease_forwards] opacity-0">
              Pricing built for rapid creators, not spreadsheets.
            </h1>
            <p className="mt-5 text-lg text-foreground/70 animate-[fade-up_0.6s_ease_forwards] [animation-delay:120ms] opacity-0">
              Scale from single prompts to full campaigns. Credits stay simple, output stays sharp.
            </p>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
                  plan.highlight && "border-yellow-400/70 shadow-[0_20px_60px_-30px_rgba(250,204,21,0.6)]",
                  "animate-[fade-up_0.6s_ease_forwards] opacity-0",
                )}
                style={{ animationDelay: `${index * 120 + 120}ms` }}
              >
                {plan.badge && (
                  <span className="absolute right-5 top-5 rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-semibold text-black">
                    {plan.badge}
                  </span>
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-foreground/60">{plan.description}</p>
                </div>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-foreground/60">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-foreground/70">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-yellow-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    asChild
                    className={cn(
                      "w-full font-semibold",
                      plan.highlight
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
                        : "bg-white text-foreground border border-border hover:bg-accent/20",
                    )}
                  >
                    <a
                      href={plan.href}
                      target={plan.external ? "_blank" : undefined}
                      rel={plan.external ? "noreferrer" : undefined}
                    >
                      {plan.cta}
                    </a>
                  </Button>
                  {plan.external && plan.href.startsWith("https://www.paypal.com") && (
                    <p className="mt-3 text-xs text-foreground/50">
                      Secure checkout handled by PayPal.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-white to-yellow-50/70 p-8 shadow-sm animate-[fade-up_0.6s_ease_forwards] opacity-0 [animation-delay:240ms]">
            <h2 className="text-3xl font-semibold text-foreground">How credits work</h2>
            <p className="mt-4 text-foreground/70">
              Every render consumes credits based on complexity. You can always preview before spending.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {usageHighlights.map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-white/80 p-4">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-foreground/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 animate-[fade-up_0.6s_ease_forwards] opacity-0 [animation-delay:360ms]">
            {creditPerks.map((perk) => (
              <div key={perk.title} className="rounded-2xl border border-border bg-white/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{perk.title}</h3>
                <p className="mt-3 text-sm text-foreground/60">{perk.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl border border-border bg-foreground text-white p-10 md:p-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-[220px] w-[220px] rounded-full bg-yellow-400/40 blur-2xl" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Need a custom plan?</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
              Build a studio pipeline that never blocks on assets.
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl">
              We can unlock SLAs, private model tuning, and dedicated throughput for large campaigns.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold">
                <a href="mailto:hello@nanobanana.ai">Schedule a call</a>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <a href="/">See the editor</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  )
}
