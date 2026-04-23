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
import { useState } from "react"

export default function ReceiptPage() {
  const searchParams = useSearchParams()
  const trackingId = searchParams.get("trackingId") || "SV-ABC123-XYZ789"
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const receiptData = {
    electionTitle: "Student Council President",
    organization: "University Elections 2026",
    votedAt: new Date().toLocaleString(),
    encryptionMethod: "AES-256-GCM",
    verificationMethod: "Zero-Knowledge Proof",
    blockchainRef: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      <div className="text-center py-8">
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

      {/* Tracking ID Card */}
      <Card className="border-primary">
        <CardHeader className="text-center">
          <CardTitle>Your Tracking ID</CardTitle>
          <CardDescription>
            Save this ID to verify your vote was recorded correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-3 p-4 bg-secondary rounded-lg">
            <code className="text-lg sm:text-xl font-mono font-bold text-card-foreground">
              {trackingId}
            </code>
            <button 
              onClick={copyToClipboard}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <Copy className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy ID"}
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Receipt Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Vote Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Election</span>
              <span className="font-medium text-card-foreground">{receiptData.electionTitle}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Organization</span>
              <span className="font-medium text-card-foreground">{receiptData.organization}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Timestamp</span>
              <span className="font-medium text-card-foreground">{receiptData.votedAt}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Encryption</span>
              <span className="font-medium text-card-foreground">{receiptData.encryptionMethod}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Verification</span>
              <span className="font-medium text-card-foreground">{receiptData.verificationMethod}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-muted-foreground">Blockchain Ref</span>
              <code className="font-mono text-sm text-card-foreground">{receiptData.blockchainRef}</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="bg-primary/5 border-primary/20">
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
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
    </div>
  )
}
