import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedPGs } from "@/components/featured-pgs"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedPGs />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
