"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Vote, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  PlusCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Admin Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Elections", href: "/admin/elections", icon: Vote },
  { name: "Manage Users", href: "/admin/users", icon: Users },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: session } = useSession()

  const userName = session?.user?.name || "Admin"
  const userEmail = session?.user?.email || "admin@securevote.com"

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 glass-strong border-r border-white/5 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">SecureVote <span className="text-[10px] uppercase px-1.5 py-0.5 bg-primary/20 text-primary rounded ml-1">Admin</span></span>
            </Link>
            <button 
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-primary/20 text-primary border border-primary/20" 
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
            
            <div className="pt-4 pb-2 px-4">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Quick Actions</p>
            </div>
            <Link
              href="/admin/elections/new"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <PlusCircle className="h-5 w-5" />
              <span className="font-medium">Create Election</span>
            </Link>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-2">
              <Avatar className="h-10 w-10 rounded-full border border-white/10">
                <AvatarFallback className="bg-primary/20 text-primary rounded-full font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">{userName}</p>
                <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-slate-400 hover:text-destructive hover:bg-destructive/10"
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
        <header className="sticky top-0 z-30 h-16 glass-strong border-b border-white/5">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <button 
              className="lg:hidden p-2 bg-white/5 rounded-lg border border-white/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5 text-slate-100" />
            </button>

            <div className="flex-1 px-4">
               <span className="hidden sm:inline-block text-sm font-medium text-slate-500">
                Administrative Control Panel
               </span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-xs font-medium text-slate-400 hover:text-primary transition-colors">
                Switch to User View
              </Link>
              
              <button className="relative p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-slate-100 transition-colors border border-white/10">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-accent rounded-full animate-pulse" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 hover:bg-white/10 transition-all outline-none border border-white/10">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="bg-primary/20 text-primary rounded-lg font-bold text-xs">
                        AD
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium text-slate-100">{userName}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-strong border-white/10">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => signOut({ callbackUrl: '/login' })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
