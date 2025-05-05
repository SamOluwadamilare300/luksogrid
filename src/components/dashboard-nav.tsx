// "use client"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Bell, Search } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function DashboardNav() {
//   const notifications = [
//     { id: 1, title: "New follower", message: "CryptoTrader123 is now following you" },
//     { id: 2, title: "Signal verified", message: "Your ETH signal has been verified" },
//     { id: 3, title: "Achievement unlocked", message: "You earned the 'Golden Signal' achievement" },
//   ]

//   return (
//     <div className="border-b">
//       <div className="flex h-16 items-center px-4">
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search signals, users..."
//             className="w-full bg-background pl-8 focus-visible:ring-purple-500"
//           />
//         </div>
//         <div className="ml-auto flex items-center gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="icon" className="relative">
//                 <Bell className="h-4 w-4" />
//                 <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] text-white">
//                   3
//                 </span>
//                 <span className="sr-only">Notifications</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-80">
//               <DropdownMenuLabel>Notifications</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {notifications.map((notification) => (
//                 <DropdownMenuItem key={notification.id} className="cursor-pointer">
//                   <div className="flex flex-col gap-1">
//                     <span className="font-medium">{notification.title}</span>
//                     <span className="text-sm text-muted-foreground">{notification.message}</span>
//                   </div>
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuksoConnectionStatus } from "@/components/lukso-connection-status"

export function DashboardNav() {
  const notifications = [
    { id: 1, title: "New follower", message: "CryptoTrader123 is now following you" },
    { id: 2, title: "Signal verified", message: "Your ETH signal has been verified" },
    { id: 3, title: "Achievement unlocked", message: "You earned the 'Golden Signal' achievement" },
  ]

  return (
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
        <div className="ml-auto flex items-center gap-4">
          <LuksoConnectionStatus />
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
  )
}
