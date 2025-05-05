"use client";

import * as React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { MarketSummary } from "@/components/market-summary";
import { SectionCards } from "@/components/section-cards";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CryptoMarketSummary } from "@/components/crypto-market-summary";
import { CryptoTable } from "@/components/crypto-table";


export default function Page() {
  const notifications = [
    { id: 1, title: "New follower", message: "CryptoTrader123 is now following you" },
    { id: 2, title: "Signal verified", message: "Your ETH signal has been verified" },
    { id: 3, title: "Achievement unlocked", message: "You earned the 'Golden Signal' achievement" },
  ]


  const [selectedIndex, setSelectedIndex] = React.useState<string>("S&P 500");
  const { isConnected } = useAccount();

  const handleSelectIndex = (indexName: string) => {
    setSelectedIndex(indexName);
  };

  if (!isConnected) {
    return redirect("/"); 
  }

  return (
    
    <>
      <div className="space-y-6">
      <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search signals, users..."
            className="w-full bg-background pl-8 focus-visible:ring-purple-500"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] text-white">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-sm text-muted-foreground">{notification.message}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
        <SectionCards onSelectIndex={handleSelectIndex} />

        <Tabs defaultValue="market-overview" className="px-4 lg:px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="market-overview">Market Overview</TabsTrigger>
            <TabsTrigger value="technical-analysis">
              Technical Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market-overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <ChartAreaInteractive selectedIndex={selectedIndex} />
              <MarketSummary />
              <CryptoTable />
            </div>
          </TabsContent>

          <TabsContent value="technical-analysis" className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Technical Analysis Preview
                </h2>
                <p className="text-muted-foreground">
                  Analyze market sectors using technical indicators
                </p>
              </div>
              {/* <Button asChild>
                <Link href="/app/stock-scanner" className="flex items-center">
                  <IconChartBar className="mr-2 h-4 w-4" />
                  Open Stock Scanner
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button> */}
            </div>
            {/* <TechnicalAnalysis /> */}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
