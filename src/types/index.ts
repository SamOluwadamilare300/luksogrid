export type Asset = string
export type Action = string
export type Timeframe = string

export interface SignalFormData {
  asset: Asset
  action: Action
  timeframe: Timeframe
  priceTarget?: string
  confidenceLevel: number
  analysis: string
  // creatorName: string
  // creatorAddress: string
  useAI?: boolean
}

export interface Signal extends SignalFormData {
  id: number
  createdAt: Date
  updatedAt: Date
  comments?: Comment[]
  likes?: Like[]
}

export interface Comment {
  id: number
  content: string
  authorName: string
  authorAddress: string
  createdAt: Date
  signalId: number
}

export interface CommentFormData {
  content: string
  authorName: string
  authorAddress: string
  signalId: number
}

export interface Like {
  id: number
  userAddress: string
  userName: string
  createdAt: Date
  signalId: number
}

export interface LikeFormData {
  userAddress: string
  userName: string
  signalId: number
}

export interface FilterOptions {
  asset?: string
  action?: string
  timeframe?: string
  search?: string
}



// export type Asset = string
// export type Action = string
// export type Timeframe = string

// export interface SignalFormData {
//   asset: Asset
//   action: Action
//   timeframe: Timeframe
//   priceTarget?: string
//   confidenceLevel: number
//   analysis: string
//   useAI?: boolean
// }

// export interface Signal extends SignalFormData {
//   id: number
//   createdAt: Date
//   updatedAt: Date
//   comments?: Comment[]
//   likes?: Like[]
// }

// export interface Comment {
//   network: "Mainnet" | "Testnet" | "Unknown"
//   id: number
//   content: string
//   authorName: string
//   authorAddress: string
//   createdAt: Date
//   signalId: number
// }

// export interface CommentFormData {
//   content: string
//   authorName: string
//   authorAddress: string
//   signalId: number
//   network: "Mainnet" | "Testnet" | "Unknown" 
// }

// export interface Like {
//   id: number
//   userAddress: string
//   userName: string
//   createdAt: Date
//   signalId: number
// }

// export interface LikeFormData {
//   userAddress: string
//   userName: string
//   signalId: number
// }

// export interface FilterOptions {
//   asset?: string
//   action?: string
//   timeframe?: string
//   search?: string
// }
