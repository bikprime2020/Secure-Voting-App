import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await auth()
  
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const users = db.getUsers()
  return NextResponse.json(users)
}

export async function DELETE(request: Request) {
  const session = await auth()
  
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await request.json()
  db.deleteUser(id)
  
  return NextResponse.json({ success: true })
}
