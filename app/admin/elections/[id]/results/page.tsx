"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  BarChart3, 
  PieChart, 
  Download, 
  RefreshCcw,
  Users,
  CheckCircle2,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"

export default function ElectionResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    setLoading(true)
    try {
      const { id } = await params;
      const response = await fetch(`/api/elections/${id}/results`)
      const data = await response.json()
      if (response.ok) {
        setResults(data)
      } else {
        toast.error(data.error || "Failed to load results")
      }
    } catch (error) {
      console.error("Fetch results error:", error)
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
        <RefreshCcw className="h-8 w-8 animate-spin mb-4 text-primary" />
        <p>Calculating live results...</p>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No results found for this election.</p>
        <Button variant="link" onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{results.title} - Results</h1>
            <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
              <Users className="h-4 w-4" />
              Total Votes Cast: <span className="text-slate-200 font-bold">{results.totalVotes}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2" onClick={fetchResults}>
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-slate-900 border-white/5 shadow-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Vote Distribution
            </CardTitle>
            <CardDescription className="text-slate-500">Visual breakdown of support for each candidate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.results.map((candidate: any) => {
              const percentage = results.totalVotes > 0 ? Math.round((candidate.votes / results.totalVotes) * 100) : 0;
              return (
                <div key={candidate.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-200">{candidate.name}</span>
                    <span className="text-slate-400">{candidate.votes} votes ({percentage}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(var(--primary),0.4)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Leading Candidate</p>
              <p className="text-lg font-bold text-slate-100">
                {results.results.reduce((prev: any, current: any) => (prev.votes > current.votes) ? prev : current).name}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Participation Rate</p>
              <p className="text-lg font-bold text-emerald-500">
                High
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="text-xs text-slate-300">Results are verified and immutable on the blockchain.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
