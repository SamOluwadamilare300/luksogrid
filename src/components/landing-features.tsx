import { BarChart3, Users, TrendingUp, Award, Vote, ShieldCheck, Fingerprint, BrainCircuit } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: <Fingerprint className="h-10 w-10 text-purple-500" />,
      title: "UP-Powered Authentication",
      description: "Seamless and secure authentication via the Universal Profile Browser Extension.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-500" />,
      title: "Personal Analytics Dashboard",
      description: "Comprehensive view of your trading performance linked to your Universal Profile.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Social Signal Feed",
      description: "Discover, follow, and interact with trading signals from other users.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-purple-500" />,
      title: "Signal Creation Studio",
      description: "Create and share your trading signals with customizable parameters.",
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-purple-500" />,
      title: "AI-Powered Predictions",
      description: "Machine learning models generate trading signals based on market data analysis.",
    },
    {
      icon: <Award className="h-10 w-10 text-purple-500" />,
      title: "Performance Leaderboards",
      description: "Discover top-performing signal providers based on verified on-chain metrics.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-500" />,
      title: "Signal NFT Achievements",
      description: "Mint successful trading signals as LSP8 Identifiable Digital Assets.",
    },
    {
      icon: <Vote className="h-10 w-10 text-purple-500" />,
      title: "Community Governance",
      description: "Participate in community-driven validation using LSP7 Digital Assets.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
