import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  const { id } = await params;
  
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const results = db.getResults(id)
  
  if (!results) {
    return NextResponse.json({ error: "Election not found" }, { status: 404 })
  }

  return NextResponse.json(results)
}
