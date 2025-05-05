export default function StatsSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Social DeFi by the Numbers
          </h2>
          <p>
            Empowering LUKSO traders with crowd-sourced signals and Universal Profile 
            integrations to navigate DeFi markets with confidence.
          </p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <div className="text-5xl font-bold">1,000+</div>
            <p>Universal Profiles Connected</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">98.7%</div>
            <p>Signal Accuracy Rate</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">50+</div>
            <p>DeFi Protocols Tracked</p>
          </div>
        </div>
      </div>
    </section>
  );
}