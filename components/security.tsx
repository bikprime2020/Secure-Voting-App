"use client"

import { Shield, Lock, FileCheck, Server } from "lucide-react"

export function Security() {
  return (
    <section id="security" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Enterprise-Grade <span className="gradient-text">Security</span> You Can Trust
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Our platform is built on a foundation of cryptographic best practices and 
              has been independently audited by leading security firms.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Lock,
                  title: "AES-256 Encryption",
                  description: "All data is encrypted at rest and in transit using military-grade encryption standards."
                },
                {
                  icon: Shield,
                  title: "Zero-Knowledge Architecture",
                  description: "Our system verifies votes without ever knowing who cast them, ensuring complete anonymity."
                },
                {
                  icon: FileCheck,
                  title: "Independent Audits",
                  description: "Regular security audits by third-party firms ensure our systems meet the highest standards."
                },
                {
                  icon: Server,
                  title: "Distributed Infrastructure",
                  description: "Multi-region deployment with automatic failover ensures 99.99% uptime and data redundancy."
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="shrink-0 h-12 w-12 rounded-xl glass-card flex items-center justify-center group-hover:glass-glow transition-all duration-300">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="glass-card rounded-2xl p-8 glass-glow relative overflow-hidden">
              {/* Noise overlay */}
              <div className="noise-overlay" />
              
              <div className="space-y-6 relative z-10">
                {/* Security Status */}
                <div className="flex items-center justify-between p-4 glass rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                    <span className="font-medium text-foreground">Security Status</span>
                  </div>
                  <span className="text-accent font-semibold">Active</span>
                </div>

                {/* Encryption Layers */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Encryption Layers</p>
                  {[
                    { name: "Transport Layer (TLS 1.3)", status: "Enabled" },
                    { name: "Application Layer (AES-256)", status: "Enabled" },
                    { name: "Database Layer (Encrypted)", status: "Enabled" },
                  ].map((layer) => (
                    <div key={layer.name} className="flex items-center justify-between p-3 glass-subtle rounded-lg">
                      <span className="text-sm text-foreground/80">{layer.name}</span>
                      <span className="text-xs text-accent font-medium px-2 py-1 glass rounded-full">
                        {layer.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Compliance Badges */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Compliance</p>
                  <div className="flex flex-wrap gap-2">
                    {["SOC 2", "GDPR", "ISO 27001", "HIPAA"].map((badge) => (
                      <span 
                        key={badge}
                        className="px-3 py-1.5 glass text-primary text-xs font-medium rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">256-bit Encryption</p>
                  <p className="text-muted-foreground text-xs">Active Protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
