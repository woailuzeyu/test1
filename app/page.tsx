import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import EditorDemo from "@/components/editor-demo"
import Showcase from "@/components/showcase"
import Reviews from "@/components/reviews"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <HeroSection />
      <EditorDemo />
      <Showcase />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  )
}
