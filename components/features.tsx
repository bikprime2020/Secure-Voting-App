"use client"

import { 
  Shield, 
  Eye, 
  Lock, 
  Smartphone, 
  BarChart3, 
  Clock,
  Fingerprint,
  Globe
} from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Proofs",
    description: "Your vote is verified without revealing your identity. Cryptographic proof ensures validity while maintaining complete anonymity."
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade AES-256 encryption protects every ballot from the moment it leaves your device until final tallying."
  },
  {
    icon: Fingerprint,
    title: "Multi-Factor Authentication",
    description: "Secure login with email, password, and TOTP or biometric verification ensures only eligible voters can participate."
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description: "Public audit logs and cryptographic proofs allow anyone to verify election integrity without compromising voter privacy."
  },
  {
    icon: BarChart3,
    title: "Real-time Results",
    description: "Watch results update live with visual dashboards. Geographic breakdowns and participation metrics at your fingertips."
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Receive a unique anonymous tracking ID immediately after voting. Verify your vote was recorded exactly as cast."
  },
  {
    icon: Smartphone,
    title: "Any Device Access",
    description: "Vote from any device with responsive design. Full accessibility support ensures everyone can participate."
  },
  {
    icon: Globe,
    title: "Scalable Infrastructure",
    description: "Built to handle millions of concurrent voters with 99.99% uptime guarantee and distributed architecture."
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 relative bg-[#030014]">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
            Security at <span className="gradient-text">Every Step</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto text-pretty">
            Built with cutting-edge cryptographic technology to ensure your vote is secure, 
            private, and accurately counted.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              
              <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-colors">
                <feature.icon className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
