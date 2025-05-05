import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Social Trading Plans for Every DeFi Strategy
          </h1>
          <p>
            Our platform provides powerful social trading tools to help LUKSO users
            make data-driven DeFi decisions. Choose the plan that fits your trading
            style and portfolio goals.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-medium">DeFi Explorer</CardTitle>

              <span className="my-3 block text-2xl font-semibold">$0 / mo</span>

              <CardDescription className="text-sm">
                Per Universal Profile, billed monthly
              </CardDescription>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Basic DeFi Analytics Dashboard",
                  "LYXe Price Tracking (1 Year History)",
                  "Limited Signal Discovery",
                  "Daily Market Updates",
                  "Community Support",
                  "Connect 1 Universal Profile",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="relative">
            <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Most Popular
            </span>

            <CardHeader>
              <CardTitle className="font-medium">Social Trader</CardTitle>

              <span className="my-3 block text-2xl font-semibold">
                0.05 LYXe / mo
              </span>

              <CardDescription className="text-sm">
                Per Universal Profile, billed monthly
              </CardDescription>

              <Button asChild className="mt-4 w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Explorer Plan",
                  "Advanced Social Trading Tools",
                  "LYXe & LSP Price History (5 Years)",
                  "Real-time Signal Notifications",
                  "Portfolio Tracking & Analysis",
                  "Customizable Signal Alerts",
                  "DeFi Protocol Analytics",
                  "Mobile App Access",
                  "Priority Support",
                  "Weekly Market Insights",
                  "Connect 3 Universal Profiles",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">DeFi Pro</CardTitle>

              <span className="my-3 block text-2xl font-semibold">
                0.1 LYXe / mo
              </span>

              <CardDescription className="text-sm">
                Per Universal Profile, billed monthly
              </CardDescription>

              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Social Trader Plan",
                  "API Access for Custom Integrations",
                  "Full Historical Data (10+ Years)",
                  "Advanced Trading Signal Algorithms",
                  "Institutional-Grade DeFi Reports",
                  "Dedicated Account Support",
                  "Custom Signal Filter Development",
                  "Multi-Profile Team Access",
                  "Quarterly Strategy Sessions",
                  "Signal Performance Analytics",
                  "Connect 10 Universal Profiles",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}