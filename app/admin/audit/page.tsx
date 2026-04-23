"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Download,
  Filter,
  Shield,
  Vote,
  UserPlus,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react"

const auditLogs = [
  {
    id: "1",
    action: "Vote Cast",
    description: "Anonymous vote recorded for Student Council President",
    category: "voting",
    severity: "info",
    timestamp: "April 16, 2026 - 14:32:15",
    hash: "0x7f9a...3d4e",
    verified: true
  },
  {
    id: "2",
    action: "Election Created",
    description: "New election 'Club Leadership 2027' was created",
    category: "admin",
    severity: "info",
    timestamp: "April 16, 2026 - 12:15:00",
    user: "admin@securevote.com",
    verified: true
  },
  {
    id: "3",
    action: "Voter Registered",
    description: "New voter john.doe@email.com added to eligible list",
    category: "user",
    severity: "info",
    timestamp: "April 16, 2026 - 11:45:22",
    user: "admin@securevote.com",
    verified: true
  },
  {
    id: "4",
    action: "Failed Login Attempt",
    description: "Multiple failed login attempts from IP 192.168.1.100",
    category: "security",
    severity: "warning",
    timestamp: "April 16, 2026 - 10:30:05",
    ip: "192.168.1.100",
    verified: true
  },
  {
    id: "5",
    action: "Settings Changed",
    description: "Election 'Budget Proposal Vote' end time was extended",
    category: "admin",
    severity: "info",
    timestamp: "April 16, 2026 - 09:22:18",
    user: "admin@securevote.com",
    verified: true
  },
  {
    id: "6",
    action: "Bulk Import",
    description: "50 voters imported from CSV file",
    category: "admin",
    severity: "info",
    timestamp: "April 15, 2026 - 16:45:00",
    user: "admin@securevote.com",
    verified: true
  },
  {
    id: "7",
    action: "Verification Request",
    description: "Vote verification requested for tracking ID SV-K8M2P1",
    category: "voting",
    severity: "info",
    timestamp: "April 15, 2026 - 15:20:33",
    verified: true
  },
  {
    id: "8",
    action: "System Alert",
    description: "Unusual voting pattern detected - flagged for review",
    category: "security",
    severity: "warning",
    timestamp: "April 15, 2026 - 14:10:45",
    verified: true
  }
]

const categoryConfig = {
  voting: { label: "Voting", icon: Vote, color: "text-primary" },
  admin: { label: "Admin", icon: Settings, color: "text-chart-3" },
  user: { label: "User", icon: UserPlus, color: "text-accent" },
  security: { label: "Security", icon: Shield, color: "text-destructive" }
}

const severityConfig = {
  info: { label: "Info", color: "bg-secondary text-secondary-foreground" },
  warning: { label: "Warning", color: "bg-chart-3/10 text-chart-3" },
  error: { label: "Error", color: "bg-destructive/10 text-destructive" }
}

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Complete activity trail for transparency and compliance</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-card-foreground">12,847</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-card-foreground">234</p>
              </div>
              <Clock className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-card-foreground">100%</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-card-foreground">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "voting", "admin", "user", "security"].map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => {
              const category = categoryConfig[log.category as keyof typeof categoryConfig]
              const severity = severityConfig[log.severity as keyof typeof severityConfig]
              const CategoryIcon = category.icon

              return (
                <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0`}>
                      <CategoryIcon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-card-foreground">{log.action}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severity.color}`}>
                          {severity.label}
                        </span>
                        {log.verified && (
                          <span className="flex items-center gap-1 text-xs text-accent">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {log.timestamp}
                        </span>
                        {log.user && (
                          <span>By: {log.user}</span>
                        )}
                        {log.ip && (
                          <span>IP: {log.ip}</span>
                        )}
                        {log.hash && (
                          <span className="font-mono">Hash: {log.hash}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cryptographic Verification Info */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Cryptographic Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            All audit logs are cryptographically signed and stored on an immutable ledger. 
            Each entry can be independently verified using its hash.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg">
              <p className="text-sm text-muted-foreground">Signing Algorithm</p>
              <p className="font-mono font-medium text-card-foreground">SHA-256</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
              <p className="text-sm text-muted-foreground">Integrity Status</p>
              <p className="font-medium text-accent">All Verified</p>
            </div>
            <div className="p-4 bg-card rounded-lg">
              <p className="text-sm text-muted-foreground">Last Verification</p>
              <p className="font-medium text-card-foreground">2 minutes ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
