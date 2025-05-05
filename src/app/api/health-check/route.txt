import { NextResponse } from "next/server"

export async function GET() {
  let prismaAvailable = false

  try {
    // Try to dynamically import Prisma
    const { prisma } = await import("@/lib/db")

    // Try a simple query to check if Prisma is working
    await prisma.$queryRaw`SELECT 1`
    prismaAvailable = true
  } catch (error) {
    console.error("Prisma health check failed:", error)
    prismaAvailable = false
  }

  return NextResponse.json({
    status: "ok",
    prismaAvailable,
    timestamp: new Date().toISOString(),
  })
}
