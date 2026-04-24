import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const { candidateId } = await request.json()
  
  const result = db.castVote(id, candidateId, session.user.id)
  
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  
  const trackingId = `SV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  
  return NextResponse.json({ success: true, trackingId })
}
