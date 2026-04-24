"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Archive,
  Filter,
  ChevronRight,
  Users,
  Calendar,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export default function AdminElectionsPage() {
  const [elections, setElections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchElections()
  }, [])

  const fetchElections = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/elections")
      const data = await response.json()
      if (Array.isArray(data)) {
        setElections(data)
      }
    } catch (error) {
      console.error("Failed to fetch elections:", error)
      toast.error("Failed to load elections")
    } finally {
      setLoading(false)
    }
  }

  const filteredElections = elections.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.organization.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Elections</h1>
          <p className="text-slate-400">Create, edit, and monitor all voting sessions.</p>
        </div>
        <Link href="/admin/elections/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            New Election
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Search elections..." 
            className="pl-10 bg-slate-900 border-white/10 focus:border-primary/50 text-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5 gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 text-slate-500">
             <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
             Loading elections...
          </div>
        ) : filteredElections.map((election) => (
          <Card key={election.id} className="bg-slate-900 border-white/5 hover:border-white/10 transition-colors shadow-lg overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-100 text-lg group-hover:text-primary transition-colors">{election.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      election.status === "Active" ? "bg-emerald-500/10 text-emerald-500" :
                      election.status === "Ending Soon" ? "bg-amber-500/10 text-amber-500" :
                      election.status === "Scheduled" ? "bg-blue-500/10 text-blue-500" :
                      "bg-slate-500/10 text-slate-500"
                    }`}>
                      {election.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{election.organization}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span>{election.voters.toLocaleString()} Eligible Voters</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>Ends {election.endDate}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-48 p-6 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center">
                   <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Participation</span>
                      <span className="text-slate-200 font-medium">{election.participation}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          election.participation > 75 ? "bg-emerald-500" : 
                          election.participation > 25 ? "bg-primary" : "bg-slate-600"
                        }`} 
                        style={{ width: `${election.participation}%` }}
                      />
                   </div>
                </div>

                <div className="p-4 lg:p-6 flex items-center justify-end gap-2 bg-white/[0.01]">
                  <Link href={`/admin/elections/${election.id}/results`}>
                    <Button variant="outline" size="sm" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Results
                    </Button>
                  </Link>
                  <Link href={`/dashboard/elections/${election.id}`}>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-slate-100">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-slate-100">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-slate-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-white/10">
                      <DropdownMenuItem className="text-slate-300 gap-2">
                        <Archive className="h-4 w-4" /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive gap-2">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
