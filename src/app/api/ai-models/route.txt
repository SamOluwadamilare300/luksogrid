import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const models = await prisma.aIModel.findMany({
      where: {
        is_active: true,
      },
      select: {
        id: true,
        name: true,
        model_type: true,
        parameters: true,
        description: true,
        is_active: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json({ success: true, models })
  } catch (error) {
    console.error("Error fetching AI models:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch AI models" }, { status: 500 })
  }
}
