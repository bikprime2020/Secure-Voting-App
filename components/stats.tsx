"use client"

import { useEffect, useState } from "react"

const stats = [
  { value: 2500000, suffix: "+", label: "Votes Securely Cast" },
  { value: 99.99, suffix: "%", label: "Platform Uptime" },
  { value: 500, suffix: "+", label: "Elections Conducted" },
  { value: 0, suffix: "", label: "Security Breaches", isZero: true }
]

function AnimatedNumber({ value, suffix, isZero }: { value: number; suffix: string; isZero?: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isZero) {
      setCount(0)
      return
    }

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, isZero])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    if (Number.isInteger(num)) {
      return num.toString()
    }
    return num.toFixed(2)
  }

  return (
    <span>
      {formatNumber(count)}{suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="py-16 relative bg-[#030014]">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-y border-white/10 -z-10" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isZero={stat.isZero} />
              </div>
              <p className="text-neutral-400 text-sm sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
