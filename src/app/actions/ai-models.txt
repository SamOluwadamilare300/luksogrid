"use server"

import { revalidatePath } from "next/cache"
import { getAIModels, getUserModelPreferences, setUserModelPreference, removeUserModelPreference } from "@/lib/db"

export async function fetchAIModels() {
  try {
    const models = await getAIModels()
    return { success: true, models }
  } catch (error) {
    console.error("Error fetching AI models:", error)
    return { success: false, error: "Failed to fetch AI models" }
  }
}

export async function fetchUserModelPreferences(userAddress: string) {
  try {
    const preferences = await getUserModelPreferences(userAddress)
    return { success: true, preferences }
  } catch (error) {
    console.error("Error fetching user model preferences:", error)
    return { success: false, error: "Failed to fetch user preferences" }
  }
}

export async function toggleModelPreference(userAddress: string, modelId: number, isActive: boolean) {
  try {
    let result

    if (isActive) {
      result = await setUserModelPreference(userAddress, modelId)
    } else {
      result = await removeUserModelPreference(userAddress, modelId)
    }

    revalidatePath("/app/ai-predictions")
    revalidatePath("/app/ai-predictions/models")

    return { success: true, result }
  } catch (error) {
    console.error("Error toggling model preference:", error)
    return { success: false, error: "Failed to update preference" }
  }
}

export async function setDefaultModel(userAddress: string, modelId: number) {
  try {
    // First, reset all default flags for this user
    await setUserModelPreference(userAddress, modelId, true)

    revalidatePath("/app/ai-predictions")
    revalidatePath("/app/ai-predictions/models")

    return { success: true }
  } catch (error) {
    console.error("Error setting default model:", error)
    return { success: false, error: "Failed to set default model" }
  }
}
