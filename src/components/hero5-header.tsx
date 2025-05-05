"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn, smoothScrollTo } from "@/lib/utils";
import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MdOutlineSecurity } from "react-icons/md";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Solution", href: "#content" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnect = async () => {
    if (isConnected) {
      router.push("/app");
      return;
    }

    setIsConnecting(true);
    try {
      // Check if connectors are available
      if (!connectors || connectors.length === 0) {
        throw new Error("No wallet connectors available");
      }

      // Connect to the first available connector
      await connect({ connector: connectors[0] });
      
      // Only redirect if connection was successful
      if (isConnected) {
        router.push("/app");
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Wallet connection failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
               <MdOutlineSecurity  size={40} />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuState(false);
                        smoothScrollTo(item.href);
                      }}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuState(false);
                          smoothScrollTo(item.href);
                        }}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                 size="sm"
                onClick={handleConnect}
                disabled={isConnecting}
               className={cn(isScrolled && "lg:hidden")}
                   >
                  {isConnecting
                   ? "Connecting..."
                 : isConnected
                  ? "See Dashboard"
                  : "Connect UPs"}
                 </Button>

                 {/* <a
  href="https://the.grid.lukso.network/add-mini-app?url=https://lukso-eight.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-4 py-2 bg-[#6e47ff] text-white rounded-lg font-semibold mt-4"
>
  🪄 Clone to My Grid
</a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
