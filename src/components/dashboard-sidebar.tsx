"use client"

import { BarChart3, TrendingUp, Award, Vote, User, Home, LogOut, BrainCircuit } from "lucide-react"
import { useLukso } from "@/components/lukso-provider"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const { universalProfile, disconnect } = useLukso()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    disconnect()
    router.push("/")
  }

  const menuItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: "Signal Feed",
      href: "/dashboard/signals",
    },
    {
      icon: <BrainCircuit className="h-4 w-4" />,
      label: "AI Predictions",
      href: "/dashboard/ai-predictions",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
    },
    {
      icon: <Award className="h-4 w-4" />,
      label: "Achievements",
      href: "/dashboard/achievements",
    },
    {
      icon: <Vote className="h-4 w-4" />,
      label: "Governance",
      href: "/dashboard/governance",
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Profile",
      href: "/dashboard/profile",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="font-semibold">LUKSO Grid Signal</div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {universalProfile && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={universalProfile.avatar || "/placeholder.svg"} alt={universalProfile.name} />
              <AvatarFallback>{universalProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{universalProfile.name}</span>
              <span className="text-xs text-muted-foreground truncate w-32">{universalProfile.address}</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
