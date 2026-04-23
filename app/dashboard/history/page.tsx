import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"

const votingHistory = [
  {
    id: "1",
    electionTitle: "Budget Proposal Vote",
    organization: "Department Meeting",
    votedAt: "April 15, 2026 - 2:34 PM",
    trackingId: "SV-K8M2P1-QR7X",
    status: "verified"
  },
  {
    id: "2",
    electionTitle: "Club Leadership Elections",
    organization: "Tech Club",
    votedAt: "April 10, 2026 - 11:20 AM",
    trackingId: "SV-L9N3Q2-ST8Y",
    status: "verified"
  },
  {
    id: "3",
    electionTitle: "Campus Facility Improvements",
    organization: "University Administration",
    votedAt: "March 28, 2026 - 4:15 PM",
    trackingId: "SV-M0O4R3-UV9Z",
    status: "verified"
  },
  {
    id: "4",
    electionTitle: "Student Union Board",
    organization: "Student Union",
    votedAt: "March 15, 2026 - 9:45 AM",
    trackingId: "SV-N1P5S4-WX0A",
    status: "verified"
  },
  {
    id: "5",
    electionTitle: "Environmental Policy Vote",
    organization: "Green Campus Initiative",
    votedAt: "February 20, 2026 - 3:30 PM",
    trackingId: "SV-O2Q6T5-YZ1B",
    status: "verified"
  }
]

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Voting History</h1>
        <p className="text-muted-foreground mt-1">Review your past votes and verification status</p>
      </div>

      {/* Stats Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Votes</p>
                <p className="text-2xl font-bold text-card-foreground">{votingHistory.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-card-foreground">{votingHistory.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-card-foreground">2</p>
              </div>
              <Calendar className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {votingHistory.map((vote) => (
          <Card key={vote.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{vote.electionTitle}</h3>
                    <p className="text-sm text-muted-foreground">{vote.organization}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{vote.votedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Tracking ID:</span>
                    <code className="text-xs font-mono bg-secondary px-2 py-1 rounded">
                      {vote.trackingId}
                    </code>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/elections/${vote.id}/receipt?trackingId=${vote.trackingId}`}>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {votingHistory.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No voting history</h3>
            <p className="text-muted-foreground mb-4">
              You haven&apos;t cast any votes yet. Participate in an election to see your history here.
            </p>
            <Link href="/dashboard/elections">
              <Button>Browse Elections</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
