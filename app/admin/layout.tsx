"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Vote, 
  Users, 
  BarChart3,
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  Bell,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Elections", href: "/admin/elections", icon: Vote },
  { name: "Voters", href: "/admin/voters", icon: Users },
  { name: "Results", href: "/admin/results", icon: BarChart3 },
  { name: "Audit Logs", href: "/admin/audit", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 glass-strong transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border/30">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">SecureVote</span>
                <span className="block text-xs text-accent">Admin Portal</span>
              </div>
            </Link>
            <button 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                              (item.href !== "/admin" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground glass-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center gap-3 px-4 py-3 glass rounded-xl mb-2">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@securevote.com</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 glass-strong">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <button 
              className="lg:hidden p-2 glass rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <button className="relative p-2.5 glass rounded-xl text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full animate-pulse" />
              </button>
              <div className="hidden sm:flex items-center gap-3 glass rounded-xl px-3 py-2">
                <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
