export class ExponentialBackoff {
  private readonly baseDelay: number
  private readonly maxDelay: number
  private readonly jitter: number

  constructor(baseDelay = 1000, maxDelay = 30000, jitter = 0.1) {
    this.baseDelay = baseDelay
    this.maxDelay = maxDelay
    this.jitter = jitter
  }

  async wait(attempt: number): Promise<void> {
    const delay = Math.min(this.baseDelay * Math.pow(2, attempt), this.maxDelay)

    // Add jitter to prevent thundering herd problem
    const jitterAmount = delay * this.jitter
    const jitteredDelay = delay + (Math.random() * 2 - 1) * jitterAmount

    await new Promise((resolve) => setTimeout(resolve, jitteredDelay))
  }
}
