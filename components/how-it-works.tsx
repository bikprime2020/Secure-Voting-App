"use client"

import { UserCheck, Vote, CheckCircle, BarChart } from "lucide-react"

const steps = [
  {
    icon: UserCheck,
    step: "01",
    title: "Verify Identity",
    description: "Securely authenticate using multi-factor verification. Your identity is confirmed without being linked to your ballot."
  },
  {
    icon: Vote,
    step: "02",
    title: "Cast Your Vote",
    description: "Review candidates and make your selection. Your ballot is encrypted instantly with zero-knowledge proofs."
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get Confirmation",
    description: "Receive an anonymous tracking ID. Use it to verify your vote was recorded correctly at any time."
  },
  {
    icon: BarChart,
    step: "04",
    title: "View Results",
    description: "Watch real-time results as they come in. Full transparency with cryptographic verification available."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            How <span className="gradient-text">SecureVote</span> Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A simple four-step process that ensures your voice is heard while maintaining 
            the highest standards of security and privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="relative z-10 text-center">
                {/* Step Circle */}
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full glass-card flex items-center justify-center group-hover:glass-glow transition-all duration-300">
                      <item.icon className="h-12 w-12 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                      {item.step}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
