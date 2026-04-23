"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Shield } from "lucide-react"
import { SplineScene } from "@/components/spline-scene"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 -z-10 opacity-30" style={{
        backgroundImage: `linear-gradient(oklch(0.70 0.18 260 / 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, oklch(0.70 0.18 260 / 0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-neutral-300">End-to-End Encrypted Voting</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
              The Future of
              <span className="gradient-text"> Secure Voting </span>
              is Here
            </h1>

            <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 text-pretty">
              Experience seamless, transparent, and tamper-proof elections with cryptographic 
              integrity. Your vote matters, and we ensure it counts exactly as cast.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="lg" className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Voting <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto glass border-border/50 hover:bg-secondary/50">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              {[
                "Zero-Knowledge Proofs",
                "Multi-Factor Auth",
                "Real-time Verification"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-neutral-400">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Spline 3D Scene */}
          <div className="relative flex justify-center lg:justify-end h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 z-20 glass-strong px-4 py-2 rounded-full text-sm font-medium animate-pulse-glow">
              <span className="gradient-text">256-bit Encrypted</span>
            </div>

            {/* Stats Badge */}
            <div className="absolute -bottom-4 -left-4 z-20 glass-strong px-5 py-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">10M+ Votes</p>
                  <p className="text-xs text-neutral-400">Securely processed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
