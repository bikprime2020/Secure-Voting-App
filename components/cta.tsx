"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-16 glass-glow">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 -z-10" />
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Ready to Transform Your <span className="gradient-text">Elections</span>?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join thousands of organizations that trust SecureVote for their most important decisions. 
              Get started in minutes with our easy setup process.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto glass border-border/50 hover:bg-secondary/50"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Free tier available for small organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
