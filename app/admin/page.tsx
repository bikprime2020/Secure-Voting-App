"use client"

import { 
  Users, 
  Vote, 
  ShieldCheck, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stats = [
  { 
    title: "Total Elections", 
    value: "12", 
    change: "+2 this month",
    trend: "up",
    icon: Vote,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    title: "Active Voters", 
    value: "8,432", 
    change: "+12% from last election",
    trend: "up",
    icon: Users,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  { 
    title: "System Integrity", 
    value: "99.9%", 
    change: "Normal",
    trend: "neutral",
    icon: ShieldCheck,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  { 
    title: "Pending Reviews", 
    value: "4", 
    change: "-2 from yesterday",
    trend: "down",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
]

const recentActivity = [
  { id: 1, type: "Election Created", target: "Department Chair Selection", time: "2 hours ago", user: "Admin" },
  { id: 2, type: "User Deleted", target: "fake.email@example.com", time: "5 hours ago", user: "Admin" },
  { id: 3, type: "System Update", target: "Security Patch v2.4", time: "Yesterday", user: "System" },
  { id: 4, type: "Election Finalized", target: "Student Council 2026", time: "2 days ago", user: "System" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Admin Overview</h1>
        <p className="text-slate-400 mt-1">Real-time monitoring and system control.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-slate-900 border-white/5 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />}
                {stat.trend === "down" && <ArrowDownRight className="h-3 w-3 text-amber-500 mr-1" />}
                <p className={`text-xs ${stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-amber-500" : "text-slate-500"}`}>
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Placeholder */}
        <Card className="col-span-4 bg-slate-900 border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-slate-100">Voting Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5">
             <div className="flex flex-col items-center gap-4 text-slate-500">
                <Activity className="h-12 w-12 animate-pulse text-primary/40" />
                <p className="text-sm">Activity visualization would load here</p>
                <div className="flex gap-2">
                   {[1,2,3,4,5,6,7,8,9,10].map(i => (
                     <div key={i} className="w-4 bg-primary/20 rounded-t" style={{ height: `${Math.random() * 100 + 20}px` }}></div>
                   ))}
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 bg-slate-900 border-white/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-slate-100">System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-100 leading-none">
                      {activity.type}: <span className="text-slate-400 font-normal">{activity.target}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      {activity.time} by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 bg-white/5 border-white/10 hover:bg-white/10 text-slate-300">
              View All Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
