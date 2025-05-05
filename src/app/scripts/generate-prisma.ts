import { execSync } from "child_process"
import fs from "fs"
import path from "path"

// Check if prisma directory exists
const prismaDir = path.join(process.cwd(), "prisma")
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir)
}

// Check if schema.prisma exists
const schemaPath = path.join(prismaDir, "schema.prisma")
if (!fs.existsSync(schemaPath)) {
  // Create a basic schema file if it doesn't exist
  const basicSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model AIModel {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  model_type  String
  parameters  Json     @default("{}")
  is_active   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  predictions      AIPrediction[]
  userPreferences  UserModelPreference[]
}

model AIPrediction {
  id          Int      @id @default(autoincrement())
  modelId     Int
  asset       String
  action      String
  confidence  Float
  timeframe   String
  reasoning   String
  priceTarget Float?
  performance Float?
  verified    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  model       AIModel  @relation(fields: [modelId], references: [id])
}

model UserModelPreference {
  userAddress String
  modelId     Int
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  model       AIModel  @relation(fields: [modelId], references: [id])
  
  @@id([userAddress, modelId])
}
`
  fs.writeFileSync(schemaPath, basicSchema)
  console.log("Created basic schema.prisma file")
}

try {
  console.log("Generating Prisma client...")
  execSync("npx prisma generate", { stdio: "inherit" })
  console.log("Prisma client generated successfully!")
} catch (error) {
  console.error("Failed to generate Prisma client:", error)
  process.exit(1)
}
