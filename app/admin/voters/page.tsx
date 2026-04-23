"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus,
  Upload,
  Download,
  MoreVertical,
  Mail,
  Trash2,
  UserCheck,
  UserX,
  Users
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const voters = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active", elections: 3, lastVoted: "April 15, 2026" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "active", elections: 5, lastVoted: "April 14, 2026" },
  { id: "3", name: "Carol Williams", email: "carol@example.com", status: "active", elections: 2, lastVoted: "April 10, 2026" },
  { id: "4", name: "David Brown", email: "david@example.com", status: "pending", elections: 0, lastVoted: "Never" },
  { id: "5", name: "Eve Davis", email: "eve@example.com", status: "active", elections: 4, lastVoted: "April 12, 2026" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", status: "inactive", elections: 1, lastVoted: "March 5, 2026" },
  { id: "7", name: "Grace Wilson", email: "grace@example.com", status: "active", elections: 6, lastVoted: "April 16, 2026" },
  { id: "8", name: "Henry Taylor", email: "henry@example.com", status: "pending", elections: 0, lastVoted: "Never" },
]

const statusConfig = {
  active: { label: "Active", color: "bg-accent/10 text-accent" },
  pending: { label: "Pending", color: "bg-chart-3/10 text-chart-3" },
  inactive: { label: "Inactive", color: "bg-muted text-muted-foreground" }
}

export default function VotersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredVoters = voters.filter(voter => {
    const matchesSearch = voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         voter.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || voter.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Voters</h1>
          <p className="text-muted-foreground mt-1">Manage eligible voters for your elections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Voter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Voters</p>
                <p className="text-2xl font-bold text-card-foreground">5,420</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-card-foreground">5,102</p>
              </div>
              <UserCheck className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-card-foreground">256</p>
              </div>
              <Mail className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-card-foreground">62</p>
              </div>
              <UserX className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "pending", "inactive"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Voters Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Voter</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Elections</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Last Voted</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVoters.map((voter) => {
                  const status = statusConfig[voter.status as keyof typeof statusConfig]
                  return (
                    <tr key={voter.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <input type="checkbox" className="rounded border-border" />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {voter.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-card-foreground">{voter.name}</p>
                            <p className="text-sm text-muted-foreground">{voter.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="text-card-foreground">{voter.elections} participated</span>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-muted-foreground">{voter.lastVoted}</span>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredVoters.length} of {voters.length} voters
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}
