import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

const links = [
  {
    group: "Platform",
    items: [
      {
        title: "Signal Explorer",
        href: "#",
      },
      {
        title: "Portfolio Tracker",
        href: "#",
      },
      {
        title: "DeFi Analytics",
        href: "#",
      },
      {
        title: "Pricing Plans",
        href: "#",
      },
      {
        title: "LUKSO API",
        href: "#",
      },
      {
        title: "Help Center",
        href: "#",
      },
    ],
  },
  {
    group: "Features",
    items: [
      {
        title: "Social Trading",
        href: "#",
      },
      {
        title: "LYXe Analytics",
        href: "#",
      },
      {
        title: "LSP Tracking",
        href: "#",
      },
      {
        title: "Signal Alerts",
        href: "#",
      },
      {
        title: "Watchlists",
        href: "#",
      },
      {
        title: "DeFi News",
        href: "#",
      },
      {
        title: "Market Reports",
        href: "#",
      },
    ],
  },
  {
    group: "Community",
    items: [
      {
        title: "About Us",
        href: "#",
      },
      {
        title: "Signal Providers",
        href: "#",
      },
      {
        title: "DeFi Blog",
        href: "#",
      },
      {
        title: "Roadmap",
        href: "#",
      },
      {
        title: "Contact Us",
        href: "#",
      },
      {
        title: "Support",
        href: "#",
      },
    ],
  },
  {
    group: "Legal",
    items: [
      {
        title: "Terms of Service",
        href: "#",
      },
      {
        title: "Privacy Policy",
        href: "#",
      },
      {
        title: "Data Usage",
        href: "#",
      },
      {
        title: "Security",
        href: "#",
      },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mb-8 border-b md:mb-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
          <Link href="/" aria-label="go home" className="block size-fit">
            <Logo />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {/* Social media links remain the same */}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <form className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
            <div className="space-y-4">
              <Label htmlFor="mail" className="block font-medium">
                DeFi Insights Newsletter
              </Label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  id="mail"
                  name="mail"
                  placeholder="Your email"
                  className="h-8 text-sm"
                />
                <Button size="sm">Subscribe</Button>
              </div>
              <span className="text-muted-foreground block text-sm">
                Get weekly LUKSO trading signals and market updates!
              </span>
            </div>
          </form>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <small className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} LUKSO Social DeFi, All rights reserved.
            Data provided for informational purposes only.
          </small>
          <form action="">
            <div className="relative">
              <ChevronsUpDown
                className="pointer-events-none absolute inset-y-0 right-2 my-auto opacity-75"
                size="0.75rem"
              />
              <select
                className={cn(
                  "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs flex h-9 w-full min-w-32 appearance-none rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                )}
                name="language"
              >
                <option value="1">English</option>
                <option value="2">Español</option>
                <option value="3">Français</option>
                <option value="4">Deutsch</option>
                <option value="5">日本語</option>
                <option value="6">简体中文</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}