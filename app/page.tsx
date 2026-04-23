import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Security } from "@/components/security"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { BackgroundPaths } from "@/components/ui/background-paths"

export default function Home() {
  return (
    <main className="min-h-screen text-white relative">
      <BackgroundPaths />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Security />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}
