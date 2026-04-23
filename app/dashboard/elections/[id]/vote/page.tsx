"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  User
} from "lucide-react"

const election = {
  id: "1",
  title: "Student Council President",
  organization: "University Elections 2026",
  description: "Vote for the next student council president who will represent student interests and advocate for positive changes in campus life.",
  endDate: "April 20, 2026",
  candidates: [
    {
      id: "c1",
      name: "Sarah Johnson",
      party: "Progressive Students Alliance",
      bio: "Third-year Political Science major with experience in student government. Advocates for improved mental health services and sustainable campus initiatives.",
      image: null
    },
    {
      id: "c2",
      name: "Michael Chen",
      party: "United Campus Coalition",
      bio: "Fourth-year Business major. Focused on career development resources, internship programs, and building stronger industry connections.",
      image: null
    },
    {
      id: "c3",
      name: "Emily Rodriguez",
      party: "Independent",
      bio: "Third-year Engineering major. Passionate about STEM accessibility, diversity initiatives, and improving campus technology infrastructure.",
      image: null
    }
  ]
}

export default function VotePage() {
  const router = useRouter()
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async () => {
    if (!selectedCandidate) return

    setIsSubmitting(true)
    // Simulate vote submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    
    // Generate a mock tracking ID and redirect to receipt
    const trackingId = `SV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    router.push(`/dashboard/elections/${election.id}/receipt?trackingId=${trackingId}`)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back Button */}
      <Link 
        href="/dashboard/elections"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to elections
      </Link>

      {/* Election Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{election.title}</h1>
        <p className="text-muted-foreground mt-1">{election.organization}</p>
      </div>

      {/* Security Notice */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-card-foreground">Your vote is secure and anonymous</p>
              <p className="text-sm text-muted-foreground">
                This ballot is encrypted with AES-256 and verified using zero-knowledge proofs. 
                Your identity cannot be linked to your vote.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Select your candidate</h2>
        <div className="space-y-3">
          {election.candidates.map((candidate) => (
            <Card 
              key={candidate.id}
              className={`cursor-pointer transition-all ${
                selectedCandidate === candidate.id 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{candidate.name}</h3>
                        <p className="text-sm text-primary">{candidate.party}</p>
                      </div>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedCandidate === candidate.id 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground"
                      }`}>
                        {selectedCandidate === candidate.id && (
                          <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{candidate.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && selectedCandidate && (
        <Card className="border-chart-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-lg">Confirm Your Vote</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You are about to cast your vote for:
            </p>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="font-semibold text-card-foreground">
                {election.candidates.find(c => c.id === selectedCandidate)?.name}
              </p>
              <p className="text-sm text-primary">
                {election.candidates.find(c => c.id === selectedCandidate)?.party}
              </p>
            </div>
            <div className="flex items-start gap-2 p-3 bg-destructive/5 rounded-lg">
              <Lock className="h-4 w-4 text-destructive mt-0.5" />
              <p className="text-sm text-destructive">
                This action cannot be undone. Your vote will be permanently recorded.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Go Back
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Submitting...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Vote
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      {!showConfirmation && (
        <div className="flex gap-4">
          <Link href="/dashboard/elections" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button 
            className="flex-1"
            disabled={!selectedCandidate}
            onClick={() => setShowConfirmation(true)}
          >
            Review Selection
          </Button>
        </div>
      )}
    </div>
  )
}
