"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  Plus, 
  Trash2,
  Info,
  ShieldCheck,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NewElectionPage() {
  const router = useRouter()
  const [candidates, setCandidates] = useState([{ id: 1, name: "" }, { id: 2, name: "" }])
  const [loading, setLoading] = useState(false)

  const addCandidate = () => {
    setCandidates([...candidates, { id: Date.now(), name: "" }])
  }

  const removeCandidate = (id: number) => {
    if (candidates.length <= 2) return
    setCandidates(candidates.filter(c => c.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const title = formData.get("title") as string
    const organization = formData.get("organization") as string
    const description = formData.get("description") as string
    const endDate = formData.get("endDate") as string
    
    const electionData = {
      title,
      organization,
      description,
      endDate,
      candidates: candidates.filter(c => c.name.trim() !== ""),
      status: 'scheduled'
    }

    try {
      const response = await fetch("/api/elections", {
        method: "POST",
        body: JSON.stringify(electionData),
        headers: { "Content-Type": "application/json" }
      })
      
      if (response.ok) {
        toast.success("Election launched successfully!")
        router.push("/admin/elections")
      } else {
        const err = await response.json()
        toast.error(err.error || "Failed to create election")
      }
    } catch (error) {
      console.error("Create election error:", error)
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="text-slate-400 hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-100">Create New Election</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900 border-white/5 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                   <Info className="h-4 w-4 text-primary" />
                   Basic Information
                </CardTitle>
                <CardDescription className="text-slate-500">Essential details for the voting session.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Election Title</label>
                  <Input 
                    name="title"
                    placeholder="e.g., Student Council 2026" 
                    className="bg-slate-950 border-white/10 text-slate-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Organization / Department</label>
                  <Input 
                    name="organization"
                    placeholder="e.g., University Student Body" 
                    className="bg-slate-950 border-white/10 text-slate-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Description</label>
                  <Textarea 
                    name="description"
                    placeholder="Provide details about the election, voting criteria, and important dates." 
                    className="bg-slate-950 border-white/10 text-slate-100 min-h-[120px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-white/5 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                   <Plus className="h-4 w-4 text-primary" />
                   Candidates / Options
                </CardTitle>
                <CardDescription className="text-slate-500">Add the choices that voters will select from.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidates.map((candidate, index) => (
                  <div key={candidate.id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input 
                        value={candidate.name}
                        onChange={(e) => {
                          const newCandidates = [...candidates];
                          newCandidates[index].name = e.target.value;
                          setCandidates(newCandidates);
                        }}
                        placeholder={`Option ${index + 1}`} 
                        className="bg-slate-950 border-white/10 text-slate-100"
                        required
                      />
                    </div>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCandidate(candidate.id)}
                      className="text-slate-500 hover:text-destructive"
                      disabled={candidates.length <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-dashed border-white/10 hover:bg-white/5 text-slate-400 mt-2"
                  onClick={addCandidate}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-white/5 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                   <ShieldCheck className="h-4 w-4 text-primary" />
                   Security & Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Voting Type</label>
                  <Select defaultValue="single">
                    <SelectTrigger className="bg-slate-950 border-white/10 text-slate-100">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-slate-100">
                      <SelectItem value="single">Single Choice</SelectItem>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                      <SelectItem value="ranked">Ranked Choice</SelectItem>
                      <SelectItem value="yesno">Yes / No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Visibility</label>
                  <Select defaultValue="public">
                    <SelectTrigger className="bg-slate-950 border-white/10 text-slate-100">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10 text-slate-100">
                      <SelectItem value="public">Public (All Users)</SelectItem>
                      <SelectItem value="private">Private (Invite Only)</SelectItem>
                      <SelectItem value="department">Department Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-white/5 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                   <Calendar className="h-4 w-4 text-primary" />
                   Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Start Date</label>
                  <Input type="date" className="bg-slate-950 border-white/10 text-slate-100" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">End Date</label>
                  <Input name="endDate" type="date" className="bg-slate-950 border-white/10 text-slate-100" required />
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                 <div className="h-5 w-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Launch Election
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-3">
         <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
         <p className="text-xs text-slate-400 leading-relaxed">
           Once launched, an election cannot be deleted if votes have already been cast. Changes to title or options after launch may require administrative override.
         </p>
      </div>
    </div>
  )
}
