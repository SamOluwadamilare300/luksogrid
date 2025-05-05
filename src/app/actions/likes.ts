"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { LikeFormData, Like } from "@/types"

export async function likeSignal(formData: LikeFormData): Promise<{ success: boolean; message: string; like?: Like }> {
  try {
    const { userAddress, userName, signalId } = formData

    // Check if the user has already liked this signal
    const existingLike = await prisma.like.findFirst({
      where: {
        userAddress,
        signalId,
      },
    })

    if (existingLike) {
      return {
        success: false,
        message: "You have already liked this signal",
      }
    }

    const newLike = await prisma.like.create({
      data: {
        userAddress,
        userName,
        signalId,
      },
    })

    // Revalidate the signal page to show the new like
    revalidatePath(`/app/signals/${signalId}`)
    revalidatePath("/app/signals")

    return {
      success: true,
      message: "Signal liked successfully",
      like: {
        id: newLike.id,
        userAddress: newLike.userAddress,
        userName: newLike.userName,
        createdAt: newLike.createdAt,
        signalId: newLike.signalId,
      },
    }
  } catch (error) {
    console.error("Error liking signal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function unlikeSignal(
  userAddress: string,
  signalId: number,
): Promise<{ success: boolean; message: string }> {
  try {
    // Check if the user has liked this signal
    const existingLike = await prisma.like.findFirst({
      where: {
        userAddress,
        signalId,
      },
    })

    if (!existingLike) {
      return {
        success: false,
        message: "You have not liked this signal",
      }
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    })

    // Revalidate the signal page to show the updated likes
    revalidatePath(`/app/signals/${signalId}`)
    revalidatePath("/app/signals")

    return {
      success: true,
      message: "Signal unliked successfully",
    }
  } catch (error) {
    console.error("Error unliking signal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function getLikesBySignalId(signalId: number): Promise<Like[]> {
  try {
    const likes = await prisma.like.findMany({
      where: {
        signalId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return likes.map((like) => ({
      id: like.id,
      userAddress: like.userAddress,
      userName: like.userName,
      createdAt: like.createdAt,
      signalId: like.signalId,
    }))
  } catch (error) {
    console.error(`Error fetching likes for signal ${signalId}:`, error)
    return []
  }
}

export async function hasUserLikedSignal(userAddress: string, signalId: number): Promise<boolean> {
  try {
    const like = await prisma.like.findFirst({
      where: {
        userAddress,
        signalId,
      },
    })

    return !!like
  } catch (error) {
    console.error(`Error checking if user ${userAddress} has liked signal ${signalId}:`, error)
    return false
  }
}
