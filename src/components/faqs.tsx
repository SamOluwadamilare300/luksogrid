export default function FAQs() {
  return (
    <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Frequently <br className="hidden lg:block" /> Asked{" "}
              <br className="hidden lg:block" />
              Questions
            </h2>
            <p>Common questions about our Social DeFi Analytics Platform</p>
          </div>

          <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
            <div className="pb-6">
              <h3 className="font-medium">
                How reliable are the social trading signals?
              </h3>
              <p className="text-muted-foreground mt-4">
                Our platform verifies all signal providers through their Universal Profiles and maintains a 98.7% accuracy rate for top-rated signals based on historical performance and community validation.
              </p>

              <ol className="list-outside list-decimal space-y-2 pl-4">
                <li className="text-muted-foreground mt-4">
                  We analyze thousands of data points across LUKSO's ecosystem including LYXe, LSPs, and DeFi protocols
                </li>
                <li className="text-muted-foreground mt-4">
                  Each signal provider has transparent performance metrics and risk scores
                </li>
                <li className="text-muted-foreground mt-4">
                  While we verify signals, all DeFi trades carry inherent risks and past performance doesn't guarantee future results
                </li>
              </ol>
            </div>
            <div className="py-6">
              <h3 className="font-medium">
                How do I connect my Universal Profile?
              </h3>
              <p className="text-muted-foreground mt-4">
                Connecting your Universal Profile is simple and secure. Just click "Connect UP" in the dashboard and authenticate with your wallet. Your profile data remains private - we only access public on-chain information.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium">
                Can I upgrade my subscription plan?
              </h3>
              <p className="text-muted-foreground my-4">
                Yes, you can upgrade your plan at any time through your account settings to access premium features like advanced signal filtering and automated trade execution.
              </p>
              <ul className="list-outside list-disc space-y-2 pl-4">
                <li className="text-muted-foreground">
                  Upgrade payments can be made in LYXe or stablecoins
                </li>
                <li className="text-muted-foreground">
                  Premium features activate immediately with no waiting period
                </li>
                <li className="text-muted-foreground">
                  You'll be charged the difference between plans pro-rated for the remaining billing period
                </li>
              </ul>
            </div>
            <div className="py-6">
              <h3 className="font-medium">
                How do I share my own trading signals?
              </h3>
              <p className="text-muted-foreground mt-4">
                Verified Universal Profile holders can share signals through our platform. After connecting your UP, navigate to the "Share Signal" section to publish your trades and analysis. Top signal providers may earn rewards in LYXe.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium">
                Is my DeFi portfolio data secure?
              </h3>
              <p className="text-muted-foreground mt-4">
                We use non-custodial wallet connections that never require your private keys. Portfolio data is read-only and encrypted. You maintain full control of your assets at all times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}