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
    <main className="min-h-screen text-white relative">
      <EtheralShadow 
        color="rgba(128, 128, 128, 1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
      />
      
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
