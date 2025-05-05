import { prisma } from "./prisma"

export async function initializeDatabase() {
  try {
    // Check if the signals table exists by trying to count records
    await prisma.signal.count()
    console.log("Database is already initialized")
  } catch (error) {
    console.error("Error checking database:", error)
    console.log("Please run Prisma migrations to initialize the database")
    console.log("npx prisma migrate dev --name init")
  }
}
