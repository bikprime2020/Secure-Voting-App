"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Calendar, 
  Users, 
  CheckCircle2,
  Clock,
  Filter
} from "lucide-react"

const elections = [
  {
    id: "1",
    title: "Student Council President",
    organization: "University Elections 2026",
    description: "Vote for the next student council president who will represent student interests.",
    endDate: "April 20, 2026",
    totalVoters: 5420,
    votedCount: 2341,
    status: "active",
    voted: false,
    type: "Single Choice"
  },
  {
    id: "2",
    title: "Faculty Representative",
    organization: "University Elections 2026",
    description: "Select representatives for each faculty to voice concerns at university meetings.",
    endDate: "April 22, 2026",
    totalVoters: 5420,
    votedCount: 1876,
    status: "active",
    voted: false,
    type: "Multiple Choice"
  },
  {
    id: "3",
    title: "Budget Proposal Vote",
    organization: "Department Meeting",
    description: "Vote on the proposed budget allocation for the upcoming fiscal year.",
    endDate: "April 18, 2026",
    totalVoters: 120,
    votedCount: 98,
    status: "urgent",
    voted: true,
    type: "Yes/No"
  },
  {
    id: "4",
    title: "Club Committee Members",
    organization: "Tech Club",
    description: "Elect new committee members for the upcoming academic year.",
    endDate: "April 25, 2026",
    totalVoters: 340,
    votedCount: 156,
    status: "active",
    voted: false,
    type: "Ranked Choice"
  }
]

import { useSession } from "next-auth/react"
import { Plus } from "lucide-react"

export default function ElectionsPage() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@securevote.com"
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "voted">("all")

  const filteredElections = elections.filter(election => {
    const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         election.organization.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === "pending") return matchesSearch && !election.voted
    if (filter === "voted") return matchesSearch && election.voted
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Active Elections</h1>
          <p className="text-muted-foreground mt-1">Browse and participate in ongoing elections</p>
        </div>
        {isAdmin && (
          <Link href="/admin/elections/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="h-4 w-4" />
              New Election
            </Button>
          </Link>
        )}
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
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            <Clock className="h-4 w-4 mr-1" />
            Pending
          </Button>
          <Button
            variant={filter === "voted" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("voted")}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Voted
          </Button>
        </div>
      </div>

      {/* Elections Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredElections.map((election) => (
          <Card key={election.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">{election.title}</h3>
                    {election.status === "urgent" && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full">
                        Ends Soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{election.organization}</p>
                </div>
                {election.voted && (
                  <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Voted
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {election.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{election.endDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{election.votedCount}/{election.totalVoters}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
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

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded">
                  {election.type}
                </span>
                {election.voted ? (
                  <Link href={`/dashboard/elections/${election.id}/receipt`}>
                    <Button variant="outline" size="sm">
                      View Receipt
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/dashboard/elections/${election.id}/vote`}>
                    <Button size="sm">
                      Vote Now
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredElections.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No elections found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}
