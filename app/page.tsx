import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Security } from "@/components/security"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { EtherealShadow } from "@/components/etheral-shadow"

export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <EtherealShadow 
        color="rgba(15, 2, 60, 0.9)"
        animation={{ scale: 80, speed: 20 }}
        noise={{ opacity: 0.1, scale: 0.7 }}
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
      </EtherealShadow>
    </main>
  )
}
