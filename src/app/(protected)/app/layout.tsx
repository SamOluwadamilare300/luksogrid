
"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/loading-spinner";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  if (isConnecting || !isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
        <p className="ml-2">Connecting wallet...</p>
      </div>
    );
  }

  return <>{children}</>;
}