"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Vote, Clock, CheckCircle2, AlertCircle, ArrowRight, Calendar } from "lucide-react"

const stats = [
  { 
    title: "Active Elections", 
    value: "3", 
    description: "Elections you can vote in",
    icon: Vote,
    gradient: "from-primary/20 to-primary/5"
  },
  { 
    title: "Pending Votes", 
    value: "2", 
    description: "Votes waiting for you",
    icon: Clock,
    gradient: "from-chart-3/20 to-chart-3/5"
  },
  { 
    title: "Completed Votes", 
    value: "7", 
    description: "Total votes cast",
    icon: CheckCircle2,
    gradient: "from-accent/20 to-accent/5"
  },
]

const activeElections = [
  {
    id: "1",
    title: "Student Council President",
    organization: "University Elections 2026",
    endDate: "April 20, 2026",
    status: "active",
    voted: false
  },
  {
    id: "2",
    title: "Faculty Representative",
    organization: "University Elections 2026",
    endDate: "April 22, 2026",
    status: "active",
    voted: false
  },
  {
    id: "3",
    title: "Budget Proposal Vote",
    organization: "Department Meeting",
    endDate: "April 18, 2026",
    status: "urgent",
    voted: true
  }
]

import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const rawName = session?.user?.name === "Demo User" ? session?.user?.email?.split('@')[0] : session?.user?.name
  const firstName = rawName?.split(" ")[0] || "User"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, <span className="gradient-text">{firstName}</span>
        </h1>
        <p className="text-muted-foreground mt-1">{"Here's what's happening with your elections"}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.title}
            className="glass-card rounded-2xl p-6 hover:glass-glow transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </span>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-foreground" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Active Elections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Active Elections</h2>
          <Link href="/dashboard/elections">
            <Button variant="ghost" size="sm" className="gap-1 hover:bg-secondary/50">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {activeElections.map((election) => (
            <div 
              key={election.id} 
              className="glass-card rounded-2xl p-6 hover:glass-glow transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{election.title}</h3>
                    {election.status === "urgent" && (
                      <span className="px-2 py-0.5 text-xs font-medium glass text-destructive rounded-full">
                        Ends Soon
                      </span>
                    )}
                    {election.voted && (
                      <span className="px-2 py-0.5 text-xs font-medium glass text-accent rounded-full">
                        Voted
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{election.organization}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Ends: {election.endDate}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {election.voted ? (
                    <Link href={`/dashboard/elections/${election.id}/receipt`}>
                      <Button variant="outline" size="sm" className="glass border-border/50 hover:bg-secondary/50">
                        View Receipt
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/dashboard/elections/${election.id}/vote`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Vote Now
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 hover:glass-glow transition-all duration-300 cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <Vote className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Cast a Vote</h3>
            <p className="text-sm text-muted-foreground">
              Participate in an active election and make your voice heard.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:glass-glow transition-all duration-300 cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Verify Vote</h3>
            <p className="text-sm text-muted-foreground">
              Use your tracking ID to verify your vote was recorded correctly.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:glass-glow transition-all duration-300 cursor-pointer group">
            <div className="h-12 w-12 rounded-xl bg-chart-3/20 flex items-center justify-center mb-4 group-hover:bg-chart-3/30 transition-colors">
              <AlertCircle className="h-6 w-6 text-chart-3" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Report Issue</h3>
            <p className="text-sm text-muted-foreground">
              Encountered a problem? Let us know and we&apos;ll help resolve it.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
