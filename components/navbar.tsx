"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">SecureVote</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Features
            </Link>
            <Link href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors text-sm">
              How It Works
            </Link>
            <Link href="#security" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Security
            </Link>
            <Link href="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/10">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#030014]">
            <div className="flex flex-col gap-2">
              <Link 
                href="#features" 
                className="text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#security" 
                className="text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <Link 
                href="/about" 
                className="text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-white/10">
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white hover:bg-white/10">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
