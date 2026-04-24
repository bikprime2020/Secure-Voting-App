import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  const elections = db.getElections()
  return NextResponse.json(elections)
}

export async function POST(request: Request) {
  const session = await auth()
  
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  
  const newElection = db.addElection({
    title: data.title,
    organization: data.organization,
    description: data.description,
    candidates: data.candidates,
    status: data.status || 'scheduled',
    endDate: data.endDate
  })
  
  return NextResponse.json(newElection)
}
