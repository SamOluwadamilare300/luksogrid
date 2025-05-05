import { ThemeProvider } from "@/components/theme-provider";
import { SharedLayout } from "@/components/shared-layout";
import type { Metadata } from "next";
// import { Inter, Roboto_Mono } from "next/font/google";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"

const GeistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GeistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import "./globals.css";
import { Providers } from "@/hooks/providers/providers";
import { LuksoProvider } from "@/components/lukso-provider"


export const metadata: Metadata = {
  title: "LUKSO Grid Signal",
  description: "Social DApp Analytics Dashboard powered by LUKSO Universal Profiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className="dark" suppressHydrationWarning>
   
      <body  className={`${GeistSans.variable} ${GeistMono.variable}`}
        
      >
      
         <Providers> 
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

           <LuksoProvider> 
          <SharedLayout>
            <main className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </main>
            <Toaster />
          </SharedLayout>
          </LuksoProvider>
        </ThemeProvider>
        </Providers>
   
      </body>
    </html>
  );
}
