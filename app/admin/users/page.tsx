"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  MoreVertical, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle,
  Mail,
  User,
  Filter,
  UserMinus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      if (Array.isArray(data)) {
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" }
      })
      
      if (response.ok) {
        setUsers(users.filter(u => u.id !== id))
        toast.success("User deleted successfully")
      } else {
        toast.error("Failed to delete user")
      }
    } catch (error) {
      console.error("Delete user error:", error)
      toast.error("An error occurred while deleting the user")
    }
  }

  const verifyUser = async (id: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({ id, status: "Verified" }),
        headers: { "Content-Type": "application/json" }
      })
      
      if (response.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, status: "Verified" } : u))
        toast.success("User verified successfully")
      } else {
        toast.error("Failed to verify user")
      }
    } catch (error) {
      console.error("Verify user error:", error)
      toast.error("An error occurred during verification")
    }
  }

  const viewProfile = (user: any) => {
    toast.info(`Profile view for ${user.name} is coming soon!`)
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const purgeUnverified = async () => {
    const unverified = users.filter(u => u.status !== "Verified")
    if (unverified.length === 0) {
      toast.info("No unverified users found")
      return
    }

    if (!confirm(`Are you sure you want to delete all ${unverified.length} unverified users?`)) {
      return
    }

    let successCount = 0
    for (const user of unverified) {
      try {
        const response = await fetch("/api/admin/users", {
          method: "DELETE",
          body: JSON.stringify({ id: user.id }),
          headers: { "Content-Type": "application/json" }
        })
        if (response.ok) successCount++
      } catch (e) {
        console.error(e)
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully purged ${successCount} users`)
      fetchUsers()
    } else {
      toast.error("Failed to purge users")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">User Management</h1>
          <p className="text-slate-400">Review, verify, and manage platform participants.</p>
        </div>
        <div className="flex gap-2">
           <Button 
             variant="outline" 
             className="border-destructive/20 text-destructive hover:bg-destructive/10 gap-2"
             onClick={purgeUnverified}
           >
             <UserMinus className="h-4 w-4" />
             Purge Unverified
           </Button>
           <Button variant="outline" className="border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5 gap-2">
             <ShieldAlert className="h-4 w-4" />
             View Suspicious
           </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 bg-slate-900 border-white/10 focus:border-primary/50 text-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5 gap-2">
          <Filter className="h-4 w-4" />
          Status
        </Button>
      </div>

      <div className="rounded-2xl border border-white/5 bg-slate-900/50 overflow-hidden shadow-2xl backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-slate-400">User</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Votes Cast</TableHead>
              <TableHead className="text-slate-400">Joined Date</TableHead>
              <TableHead className="text-right text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-white/10">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold uppercase">
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-100">{user.name}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${
                    user.status === "Verified" ? "text-emerald-500" :
                    user.status === "Suspicious" ? "text-amber-500" :
                    "text-destructive"
                  }`}>
                    {user.status === "Verified" && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {user.status === "Suspicious" && <ShieldAlert className="h-3.5 w-3.5" />}
                    {user.status === "Blocked" && <XCircle className="h-3.5 w-3.5" />}
                    {user.status}
                  </div>
                </TableCell>
                <TableCell className="text-slate-300 font-mono text-sm">
                  {(user.votesCast || 0).toString().padStart(2, '0')}
                </TableCell>
                <TableCell className="text-slate-400 text-sm">
                  {user.joinedDate}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 w-48">
                      <DropdownMenuItem 
                        className="text-slate-300 gap-2 cursor-pointer"
                        onClick={() => viewProfile(user)}
                      >
                        <User className="h-4 w-4" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-slate-300 gap-2 cursor-pointer"
                        onClick={() => verifyUser(user.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Verify User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive gap-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        <UserMinus className="h-4 w-4" /> Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!loading && filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3">
         <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
         <p className="text-xs text-slate-400 leading-relaxed">
           Administrative deletion of a user will remove all associated personal data and voting records to maintain system integrity. This action is logged for audit purposes.
         </p>
      </div>
    </div>
  )
}
