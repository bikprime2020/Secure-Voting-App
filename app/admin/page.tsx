import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Vote, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Clock,
  AlertCircle,
  Plus
} from "lucide-react"

const stats = [
  { 
    title: "Total Elections", 
    value: "12", 
    change: "+2 this month",
    icon: Vote,
    color: "text-primary"
  },
  { 
    title: "Active Voters", 
    value: "5,420", 
    change: "+320 this week",
    icon: Users,
    color: "text-chart-3"
  },
  { 
    title: "Votes Cast", 
    value: "15,847", 
    change: "+1,234 today",
    icon: CheckCircle2,
    color: "text-accent"
  },
  { 
    title: "Participation Rate", 
    value: "73%", 
    change: "+5% vs last election",
    icon: TrendingUp,
    color: "text-chart-1"
  },
]

const activeElections = [
  {
    id: "1",
    title: "Student Council President",
    status: "active",
    totalVoters: 5420,
    votedCount: 2341,
    endDate: "April 20, 2026"
  },
  {
    id: "2",
    title: "Faculty Representative",
    status: "active",
    totalVoters: 5420,
    votedCount: 1876,
    endDate: "April 22, 2026"
  },
  {
    id: "3",
    title: "Budget Proposal Vote",
    status: "urgent",
    totalVoters: 120,
    votedCount: 98,
    endDate: "April 18, 2026"
  }
]

const recentActivity = [
  { action: "New voter registered", user: "john.doe@email.com", time: "2 minutes ago" },
  { action: "Vote cast", election: "Student Council President", time: "5 minutes ago" },
  { action: "Election created", election: "Club Elections 2026", time: "1 hour ago" },
  { action: "Voter list updated", count: 50, time: "2 hours ago" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage elections and monitor voter participation</p>
        </div>
        <Link href="/admin/elections/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Election
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Elections */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Active Elections</h2>
            <Link href="/admin/elections">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {activeElections.map((election) => (
              <Card key={election.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-card-foreground">{election.title}</h3>
                        {election.status === "urgent" && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Ends Soon
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {election.votedCount}/{election.totalVoters} voted
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Ends: {election.endDate}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Participation</span>
                          <span>{Math.round((election.votedCount / election.totalVoters) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(election.votedCount / election.totalVoters) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Link href={`/admin/elections/${election.id}`}>
                      <Button variant="outline" size="sm" className="ml-4">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-card-foreground font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.user || activity.election || `${activity.count} voters`}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/elections/new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base mb-1">Create Election</CardTitle>
                <CardDescription className="text-sm">
                  Set up a new election or poll
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/voters">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center mb-4 group-hover:bg-chart-3/20 transition-colors">
                  <Users className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="text-base mb-1">Manage Voters</CardTitle>
                <CardDescription className="text-sm">
                  Add or remove eligible voters
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/results">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-base mb-1">View Results</CardTitle>
                <CardDescription className="text-sm">
                  See real-time election results
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/audit">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center mb-4 group-hover:bg-chart-1/20 transition-colors">
                  <Vote className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle className="text-base mb-1">Audit Logs</CardTitle>
                <CardDescription className="text-sm">
                  Review system activity logs
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
