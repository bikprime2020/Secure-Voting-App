"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download,
  RefreshCw,
  Trophy,
  Clock
} from "lucide-react"

const elections = [
  { id: "1", title: "Student Council President", status: "active" },
  { id: "2", title: "Faculty Representative", status: "active" },
  { id: "3", title: "Budget Proposal Vote", status: "completed" },
]

const resultsData = {
  "1": {
    title: "Student Council President",
    status: "active",
    totalVoters: 5420,
    votedCount: 2341,
    lastUpdated: "2 minutes ago",
    candidates: [
      { name: "Sarah Johnson", party: "Progressive Students Alliance", votes: 1021, percentage: 43.6 },
      { name: "Michael Chen", party: "United Campus Coalition", votes: 856, percentage: 36.6 },
      { name: "Emily Rodriguez", party: "Independent", votes: 464, percentage: 19.8 },
    ]
  },
  "2": {
    title: "Faculty Representative",
    status: "active",
    totalVoters: 5420,
    votedCount: 1876,
    lastUpdated: "5 minutes ago",
    candidates: [
      { name: "Dr. James Wilson", party: "Faculty Council", votes: 612, percentage: 32.6 },
      { name: "Prof. Maria Garcia", party: "Academic Unity", votes: 543, percentage: 28.9 },
      { name: "Dr. Robert Lee", party: "Independent", votes: 421, percentage: 22.4 },
      { name: "Prof. Susan Kim", party: "Faculty Voice", votes: 300, percentage: 16.0 },
    ]
  },
  "3": {
    title: "Budget Proposal Vote",
    status: "completed",
    totalVoters: 120,
    votedCount: 98,
    lastUpdated: "Final Results",
    candidates: [
      { name: "Approve Budget", party: "", votes: 67, percentage: 68.4 },
      { name: "Reject Budget", party: "", votes: 31, percentage: 31.6 },
    ]
  }
}

export default function ResultsPage() {
  const [selectedElection, setSelectedElection] = useState("1")
  const results = resultsData[selectedElection as keyof typeof resultsData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Election Results</h1>
          <p className="text-muted-foreground mt-1">Real-time results and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Election Selector */}
      <div className="flex gap-2 flex-wrap">
        {elections.map((election) => (
          <Button
            key={election.id}
            variant={selectedElection === election.id ? "default" : "outline"}
            onClick={() => setSelectedElection(election.id)}
          >
            {election.title}
            {election.status === "active" && (
              <span className="ml-2 h-2 w-2 bg-accent rounded-full animate-pulse" />
            )}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Votes</p>
                <p className="text-2xl font-bold text-card-foreground">{results.votedCount.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Eligible Voters</p>
                <p className="text-2xl font-bold text-card-foreground">{results.totalVoters.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Participation</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {Math.round((results.votedCount / results.totalVoters) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-2xl font-bold text-card-foreground">{results.lastUpdated}</p>
              </div>
              <Clock className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Vote Distribution</CardTitle>
            <CardDescription>Current standings based on votes cast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.candidates.map((candidate, index) => (
              <div key={candidate.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {index === 0 && results.status === "completed" && (
                      <Trophy className="h-4 w-4 text-chart-3" />
                    )}
                    <span className="font-medium text-card-foreground">{candidate.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {candidate.votes.toLocaleString()} votes ({candidate.percentage}%)
                  </span>
                </div>
                <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                  <div 
                    className={`h-full rounded-lg transition-all duration-500 ${
                      index === 0 ? 'bg-primary' : 
                      index === 1 ? 'bg-chart-3' : 
                      index === 2 ? 'bg-accent' : 'bg-chart-1'
                    }`}
                    style={{ width: `${candidate.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Current Standings</CardTitle>
            <CardDescription>
              {results.status === "active" ? "Live rankings" : "Final results"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.candidates.map((candidate, index) => (
                <div 
                  key={candidate.name}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    index === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-secondary'
                  }`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-primary text-primary-foreground' :
                    index === 1 ? 'bg-chart-3 text-accent-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-card-foreground">{candidate.name}</p>
                    {candidate.party && (
                      <p className="text-sm text-muted-foreground">{candidate.party}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-card-foreground">{candidate.percentage}%</p>
                    <p className="text-sm text-muted-foreground">{candidate.votes.toLocaleString()} votes</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participation Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Participation Progress</CardTitle>
          <CardDescription>Overall voter turnout for this election</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {results.votedCount.toLocaleString()} of {results.totalVoters.toLocaleString()} eligible voters
              </span>
              <span className="font-medium text-card-foreground">
                {Math.round((results.votedCount / results.totalVoters) * 100)}%
              </span>
            </div>
            <div className="h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(results.votedCount / results.totalVoters) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
