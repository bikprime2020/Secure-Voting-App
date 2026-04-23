"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Plus,
  Calendar, 
  Users, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const elections = [
  {
    id: "1",
    title: "Student Council President",
    description: "Vote for the next student council president",
    status: "active",
    startDate: "April 15, 2026",
    endDate: "April 20, 2026",
    totalVoters: 5420,
    votedCount: 2341,
    candidates: 3
  },
  {
    id: "2",
    title: "Faculty Representative",
    description: "Select representatives for each faculty",
    status: "active",
    startDate: "April 18, 2026",
    endDate: "April 22, 2026",
    totalVoters: 5420,
    votedCount: 1876,
    candidates: 5
  },
  {
    id: "3",
    title: "Budget Proposal Vote",
    description: "Vote on the proposed budget allocation",
    status: "active",
    startDate: "April 16, 2026",
    endDate: "April 18, 2026",
    totalVoters: 120,
    votedCount: 98,
    candidates: 2
  },
  {
    id: "4",
    title: "Environmental Policy Vote",
    description: "Decide on campus environmental initiatives",
    status: "completed",
    startDate: "March 10, 2026",
    endDate: "March 15, 2026",
    totalVoters: 4200,
    votedCount: 3150,
    candidates: 3
  },
  {
    id: "5",
    title: "Club Leadership 2027",
    description: "Elect new club leadership committee",
    status: "draft",
    startDate: "May 1, 2026",
    endDate: "May 5, 2026",
    totalVoters: 340,
    votedCount: 0,
    candidates: 4
  }
]

const statusConfig = {
  active: { label: "Active", color: "bg-accent/10 text-accent", icon: CheckCircle2 },
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: Clock },
  completed: { label: "Completed", color: "bg-secondary text-secondary-foreground", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive", icon: XCircle }
}

export default function AdminElectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredElections = elections.filter(election => {
    const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || election.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Elections</h1>
          <p className="text-muted-foreground mt-1">Create and manage your elections</p>
        </div>
        <Link href="/admin/elections/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Election
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search elections..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "draft", "completed"].map((status) => (
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

      {/* Elections Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Election</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Duration</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Participation</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredElections.map((election) => {
                  const status = statusConfig[election.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <tr key={election.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-card-foreground">{election.title}</p>
                          <p className="text-sm text-muted-foreground">{election.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="text-sm">
                          <p className="text-card-foreground">{election.startDate}</p>
                          <p className="text-muted-foreground">to {election.endDate}</p>
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="w-32">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{election.votedCount}/{election.totalVoters}</span>
                            <span>{Math.round((election.votedCount / election.totalVoters) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(election.votedCount / election.totalVoters) * 100}%` }}
                            />
                          </div>
                        </div>
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
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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

      {filteredElections.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No elections found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Link href="/admin/elections/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Election
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
