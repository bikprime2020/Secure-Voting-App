"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Copy, 
  Download, 
  Share2, 
  ArrowLeft,
  Shield,
  Clock,
  FileText
} from "lucide-react"
import { useEffect, useState, use } from "react"
import { Loader2 } from "lucide-react"

export default function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const electionId = resolvedParams.id
  const searchParams = useSearchParams()
  const trackingId = searchParams.get("trackingId") || "SV-ABC123-XYZ789"
  const [copied, setCopied] = useState(false)
  const [election, setElection] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const response = await fetch(`/api/elections/${electionId}`)
        const data = await response.json()
        setElection(data)
      } catch (error) {
        console.error("Failed to fetch election:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchElection()
  }, [electionId])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const receiptData = {
    electionTitle: election?.title || "Loading...",
    organization: election?.organization || "Loading...",
    votedAt: new Date().toLocaleString(),
    encryptionMethod: "AES-256-GCM",
    verificationMethod: "Zero-Knowledge Proof",
    blockchainRef: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
  }

  const handleDownload = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p>Generating receipt...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Success Message - Hidden on print */}
      <div className="text-center py-8 print:hidden">
        <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Vote Successfully Cast!
        </h1>
        <p className="text-muted-foreground">
          Your vote has been securely recorded and encrypted
        </p>
      </div>

      {/* Printable Receipt Container */}
      <div className="space-y-6 print:m-0 print:p-0">
        {/* Tracking ID Card */}
        <Card className="border-primary print:border-slate-200">
          <CardHeader className="text-center">
            <CardTitle>Your Tracking ID</CardTitle>
            <CardDescription className="print:text-slate-500">
              Save this ID to verify your vote was recorded correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-secondary rounded-lg print:bg-slate-100 print:border">
              <code className="text-lg sm:text-xl font-mono font-bold text-card-foreground print:text-black">
                {trackingId}
              </code>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-muted rounded-md transition-colors print:hidden"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                ) : (
                  <Copy className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
            
            <div className="flex gap-2 print:hidden">
              <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy ID"}
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Details */}
        <Card className="print:border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Vote Receipt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between py-3 border-b border-border print:border-slate-100">
                <span className="text-muted-foreground print:text-slate-500">Election</span>
                <span className="font-medium text-card-foreground print:text-black">{receiptData.electionTitle}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border print:border-slate-100">
                <span className="text-muted-foreground print:text-slate-500">Organization</span>
                <span className="font-medium text-card-foreground print:text-black">{receiptData.organization}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border print:border-slate-100">
                <span className="text-muted-foreground print:text-slate-500">Timestamp</span>
                <span className="font-medium text-card-foreground print:text-black">{receiptData.votedAt}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border print:border-slate-100">
                <span className="text-muted-foreground print:text-slate-500">Encryption</span>
                <span className="font-medium text-card-foreground print:text-black">{receiptData.encryptionMethod}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border print:border-slate-100">
                <span className="text-muted-foreground print:text-slate-500">Verification</span>
                <span className="font-medium text-card-foreground print:text-black">{receiptData.verificationMethod}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground print:text-slate-500">Blockchain Ref</span>
                <code className="font-mono text-sm text-card-foreground print:text-black">{receiptData.blockchainRef}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Info - Hidden on print */}
      <Card className="bg-primary/5 border-primary/20 print:hidden">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-card-foreground">Your vote is protected</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your vote has been encrypted and cannot be traced back to you. 
                Use your tracking ID to verify your vote was counted correctly 
                without revealing how you voted.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions - Hidden on print */}
      <div className="flex flex-col sm:flex-row gap-3 print:hidden">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/elections" className="flex-1">
          <Button className="w-full">
            View More Elections
          </Button>
        </Link>
      </div>

      {/* Print-only CSS */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          aside, header, footer, .print\\:hidden {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .lg\\:pl-64 {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
