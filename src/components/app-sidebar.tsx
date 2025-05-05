"use client";

import {
  BarChart2,
  Command,
  DollarSign,
  FileText,
  Frame,
  Globe,
  LifeBuoy,
  LineChart,
  Map,
  PieChart,
  Send,
  TrendingUp,
  Home,
  Award,
  Vote,
  User,
  LogOut,
  BrainCircuit,
  BarChart3,
  Bot,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const navigationData = {
  user: {
    name: "Lukso",
    email: "",
    avatar: "",
  },
  navMain: [
    {
      label: "",
      items: [
        {
          name: "Overview",
          url: "/app",
          icon: Home,
        },
      ],
    },
    {
      label: "Market Insights",
      items: [

        {
          name: "Signal Feed",
          url: "/app/signals",
          icon: TrendingUp,
        },
      ],
    },
    {
      label: "AI Tools",
      items: [
        {
          name: "AI Predictions",
          url: "/app/ai-predictions",
          icon: BrainCircuit,
        },
        {
          name: "AI Trading Bot",
          url: "/app/ai-trading-bot",
          icon: Bot,
          disabled: true,
          tooltip: "AI-powered trading bot — launching soon!",
        },
        
      ],
    },
    {
      label: "Financial Tools",
      items: [
       
        {
          name: "Financial Reports",
          url: "/app/fundamentals/reports",
          icon: FileText,
          disabled: true,
          tooltip: "Access real-time financial reports — coming soon!",
        },
        {
          name: "Balance Sheets",
          url: "/app/fundamentals/balance",
          icon: DollarSign,
          disabled: true,
          tooltip: "Comprehensive balance sheet overview — launching soon!",
        },
        {
          name: "Profit and Loss",
          url: "/app/fundamentals/profit-loss",
          icon: TrendingUp,
          disabled: true,
          tooltip: "Track profit and loss margins — coming soon!",
        },
      ],
    },
    {
      label: "Community & Engagement",
      items: [
        {
          name: "Leaderboard",
          url: "/app/leaderboard",
          icon: BarChart3,
        },
        {
          name: "Achievements",
          url: "/app/achievements",
          icon: Award,
        },
        {
          name: "Governance",
          url: "/app/governance",
          icon: Vote,
        },
      ],
    },
  ],
  navSecondary: {
    label: "Settings", 
    items: [
      {
        title: "Profile",
        url: "/app/profile",
        icon: User,
      },
      {
        title: "Support",
        url: "/app/support",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "/app/feedback",
        icon: Send,
      },
    ],
  },
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  pathname?: string;
}

export function AppSidebar({ pathname = "", ...props }: AppSidebarProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const { address: walletAddress } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      disconnect?.();
      router.push("/");
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/app">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Lukso analysis</span>
                  <span className="truncate text-xs">Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Original Navigation */}
        <NavMain items={navigationData.navMain} currentPath={pathname} />
        
        {/* New Dashboard Menu Items */}
        {/* Placeholder or remove this section if not needed */}
        {/* <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span>No dashboard menu items available</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}

        {/* Original Secondary Navigation */}
        <NavSecondary
          label={navigationData.navSecondary.label} 
          items={navigationData.navSecondary.items}
          className="mt-auto"
          currentPath={pathname}
          />
      </SidebarContent>
      <SidebarFooter>
        {walletAddress ? (
          <div className="flex items-center gap-2 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={navigationData.user.avatar ?? ""} alt={navigationData.user.name} />
              <AvatarFallback>{navigationData.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Button 
                onClick={handleDisconnect} 
                className="w-full justify-start"
                variant="ghost"
              >
                Disconnect ({walletAddress.slice(0, 6)}...{walletAddress.slice(-4)})
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDisconnect}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button onClick={() => router.push("/")} className="w-full">
            Connect Wallet
          </Button>
        )}
        <NavUser user={navigationData.user ?? ""} />
      </SidebarFooter>
    </Sidebar>
  );
}