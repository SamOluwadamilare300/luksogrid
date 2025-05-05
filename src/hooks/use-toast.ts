"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

// Type definitions
type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
}

// Custom toast function that wraps sonner
function toast(toastData: {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
}) {
  const { title, description, variant } = toastData

  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description: description,
    })
  }

  return sonnerToast(title, {
    description: description,
  })
}

// Custom hook that provides similar interface to your original useToast
function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}

export { useToast, toast }