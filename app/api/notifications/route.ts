import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // Mock notifications data
  const notifications = [
    {
      id: "1",
      title: "New Election Started",
      description: "Student Council President 2026 is now live.",
      time: "2 hours ago",
      type: "election",
      read: false
    },
    {
      id: "2",
      title: "Vote Recorded",
      description: "Your vote for Budget Proposal has been verified.",
      time: "5 hours ago",
      type: "vote",
      read: true
    },
    {
      id: "3",
      title: "Security Alert",
      description: "Your account was accessed from a new device.",
      time: "1 day ago",
      type: "security",
      read: true
    }
  ]

  return NextResponse.json(notifications)
}
