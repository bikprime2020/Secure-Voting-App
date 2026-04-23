import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Security } from "@/components/security"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { EtheralShadow } from "@/components/ui/etheral-shadow"

export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <EtheralShadow 
        color="rgba(30, 0, 80, 0.9)"
        animation={{ scale: 100, speed: 30 }}
        noise={{ opacity: 0.15, scale: 1.2 }}
        className="min-h-screen"
      >
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Security />
        <CTA />
        <Footer />
      </EtheralShadow>
    </main>
  )
}
