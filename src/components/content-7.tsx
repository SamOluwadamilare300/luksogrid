"use client";

import { ChartLine, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  price: {
    label: "LYXe Price",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Trade Volume",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Sample data for the chart
const chartData = [
  { date: "2023-01", price: 126, volume: 252 },
  { date: "2023-02", price: 205, volume: 410 },
  { date: "2023-03", price: 178, volume: 300 },
  { date: "2023-04", price: 290, volume: 500 },
  { date: "2023-05", price: 340, volume: 450 },
  { date: "2023-06", price: 400, volume: 800 },
];

export default function ContentSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-3xl font-medium md:text-4xl lg:text-5xl">
          Social DeFi analytics powered by Universal Profiles.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative space-y-4">
            <p className="text-muted-foreground text-sm sm:text-base">
              Our platform bridges DeFi and social trading.{" "}
              <span className="text-accent-foreground font-bold">
                It provides a comprehensive ecosystem
              </span>{" "}
              — from real-time token data to community-powered signals.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Access LUKSO market coverage, crowd-sourced insights, and powerful
              analytical tools to make data-driven decisions in DeFi through
              Universal Profile integrations.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:gap-4 sm:pt-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  <h3 className="text-sm font-medium">Social Signals</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Real-time trading signals shared by verified Universal Profiles.
                </p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <ChartLine className="size-4" />
                  <h3 className="text-sm font-medium">DeFi Analytics</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Advanced metrics for LYXe, LSPs and LUKSO ecosystem tokens.
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="bg-linear-to-b aspect-auto sm:aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <ChartContainer
                className="h-[200px] w-full sm:h-[250px] md:h-[300px]"
                config={chartConfig}
              >
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="rgba(34, 197, 94, 0.8)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="rgba(34, 197, 94, 0.1)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={10}
                    tick={{ fontSize: "0.75rem" }}
                    tickFormatter={value => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                      });
                    }}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={value => value.toLocaleString()}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: "0.75rem" }}
                    width={40}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={value => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          });
                        }}
                        indicator="dot"
                        formatter={(value: any) => {
                          return typeof value === "number"
                            ? value.toLocaleString()
                            : value;
                        }}
                      />
                    }
                  />
                  <Area
                    dataKey="price"
                    type="monotone"
                    fill="url(#fillPrice)"
                    stroke="rgba(34, 197, 94, 1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}