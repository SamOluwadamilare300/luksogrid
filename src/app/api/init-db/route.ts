import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check if the signals table exists by trying to count records
    try {
      await prisma.signal.count()
      return NextResponse.json({ message: "Database is already initialized" })
    } catch (error) {
      // If the table doesn't exist, we need to run migrations
      return NextResponse.json(
        {
          message: "Database needs initialization",
          error: "Please run Prisma migrations to initialize the database",
          command: "npx prisma migrate dev --name init",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error checking database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
