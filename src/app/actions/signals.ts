"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { SignalFormData, Signal, FilterOptions } from "@/types"

export async function createSignal(
  formData: SignalFormData,
): Promise<{ success: boolean; message: string; signal?: Signal }> {
  try {
    const { asset, action, timeframe, priceTarget, confidenceLevel, analysis} = formData

    const newSignal = await prisma.signal.create({
      data: {
        asset,
        action,
        timeframe,
        priceTarget,
        confidenceLevel,
        analysis,
        // creatorName: creatorName || "Anonymous",
        // creatorAddress: creatorAddress || "0x0000000000000000000000000000000000000000",
      },
    })

    // Revalidate the signals page to show the new signal
    revalidatePath("/app/signals")

    return {
      success: true,
      message: "Signal created successfully",
      signal: {
        id: newSignal.id,
        asset: newSignal.asset,
        action: newSignal.action,
        timeframe: newSignal.timeframe,
        priceTarget: newSignal.priceTarget || undefined,
        confidenceLevel: newSignal.confidenceLevel,
        analysis: newSignal.analysis,
        // creatorName: newSignal.creatorName,
        // creatorAddress: newSignal.creatorAddress,
        createdAt: newSignal.createdAt,
        updatedAt: newSignal.updatedAt,
      },
    }
  } catch (error) {
    console.error("Error creating signal:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function getSignals(filters?: FilterOptions): Promise<Signal[]> {
  try {
    const where: any = {}

    if (filters) {
      if (filters.asset && filters.asset !== "all") {
        where.asset = filters.asset
      }
      if (filters.action && filters.action !== "all") {
        where.action = filters.action
      }
      if (filters.timeframe && filters.timeframe !== "all") {
        where.timeframe = filters.timeframe
      }
      if (filters.search) {
        where.OR = [
          { creatorName: { contains: filters.search, mode: "insensitive" } },
          { creatorAddress: { contains: filters.search, mode: "insensitive" } },
          { analysis: { contains: filters.search, mode: "insensitive" } },
          { asset: { contains: filters.search, mode: "insensitive" } },
        ]
      }
    }

    const signals = await prisma.signal.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: {
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: true,
      },
    })

    return signals.map((signal) => ({
      id: signal.id,
      asset: signal.asset,
      action: signal.action,
      timeframe: signal.timeframe,
      priceTarget: signal.priceTarget || undefined,
      confidenceLevel: signal.confidenceLevel,
      analysis: signal.analysis,
      // creatorName: signal.creatorName,
      // creatorAddress: signal.creatorAddress,
      createdAt: signal.createdAt,
      updatedAt: signal.updatedAt,
      comments: signal.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        authorName: comment.authorName,
        authorAddress: comment.authorAddress,
        createdAt: comment.createdAt,
        signalId: comment.signalId,
      })),
      likes: signal.likes.map((like) => ({
        id: like.id,
        userAddress: like.userAddress,
        userName: like.userName,
        createdAt: like.createdAt,
        signalId: like.signalId,
      })),
    }))
  } catch (error) {
    console.error("Error fetching signals:", error)
    return []
  }
}

export async function getSignalById(id: number): Promise<Signal | null> {
  try {
    const signal = await prisma.signal.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: true,
      },
    })

    if (!signal) {
      return null
    }

    return {
      id: signal.id,
      asset: signal.asset,
      action: signal.action,
      timeframe: signal.timeframe,
      priceTarget: signal.priceTarget || undefined,
      confidenceLevel: signal.confidenceLevel,
      analysis: signal.analysis,
      // creatorName: signal.creatorName,
      // creatorAddress: signal.creatorAddress,
      createdAt: signal.createdAt,
      updatedAt: signal.updatedAt,
      comments: signal.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        authorName: comment.authorName,
        authorAddress: comment.authorAddress,
        createdAt: comment.createdAt,
        signalId: comment.signalId,
      })),
      likes: signal.likes.map((like) => ({
        id: like.id,
        userAddress: like.userAddress,
        userName: like.userName,
        createdAt: like.createdAt,
        signalId: like.signalId,
      })),
    }
  } catch (error) {
    console.error(`Error fetching signal with id ${id}:`, error)
    return null
  }
}

export async function getUniqueAssets(): Promise<string[]> {
  try {
    const assets = await prisma.signal.findMany({
      select: {
        asset: true,
      },
      distinct: ["asset"],
    })
    return assets.map((a) => a.asset)
  } catch (error) {
    console.error("Error fetching unique assets:", error)
    return []
  }
}

export async function getUniqueActions(): Promise<string[]> {
  try {
    const actions = await prisma.signal.findMany({
      select: {
        action: true,
      },
      distinct: ["action"],
    })
    return actions.map((a) => a.action)
  } catch (error) {
    console.error("Error fetching unique actions:", error)
    return []
  }
}

export async function getUniqueTimeframes(): Promise<string[]> {
  try {
    const timeframes = await prisma.signal.findMany({
      select: {
        timeframe: true,
      },
      distinct: ["timeframe"],
    })
    return timeframes.map((t) => t.timeframe)
  } catch (error) {
    console.error("Error fetching unique timeframes:", error)
    return []
  }
}
