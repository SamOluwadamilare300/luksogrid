
"use client"

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, Share2, Copy } from "lucide-react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useUniversalProfile } from "@/hooks";

export function ProfileHeader() {
  const { address } = useAccount();

  // Add a network selector
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const { profile, isLoading, error } = useUniversalProfile(address, network);

  const handleCopyAddress = useCallback(() => {
    if (!address) {
      toast.error("No address to copy");
      return;
    }

    navigator.clipboard.writeText(address)
      .then(() => {
        toast.success("Address copied to clipboard!");
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error("Failed to copy address");
      });
  }, [address]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Profile link copied to clipboard!");
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error("Failed to copy profile link");
      });
  };

  const handleShareProfile = useCallback(() => {
    if (!address) {
      toast.error("No account connected");
      return;
    }

    const profileUrl = `${window.location.origin}/profile/${address}`;

    if (navigator.share) {
      navigator.share({
        title: `${profile?.name || 'Universal Profile'}`,
        text: `Check out my Universal Profile on LUKSO`,
        url: profileUrl,
      }).catch((err) => {
        console.error('Error sharing:', err);
        copyToClipboard(profileUrl);
      });
    } else {
      copyToClipboard(profileUrl);
    }
  }, [address, profile?.name]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Network Selector */}
      <div className="mb-2">
        <label htmlFor="network-select" className="mr-2 font-medium">Network:</label>
        <select
          id="network-select"
          value={network}
          onChange={e => setNetwork(e.target.value as "testnet" | "testnet")}
          className="border rounded px-2 py-1"
        >
           <option value="testnet">Testnet</option>
          <option value="mainnet">Mainnet</option>
         
        </select>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-4">Loading profile...</div>
      )}

      {error && (
        <div className="flex flex-col gap-4">Error: {error}</div>
      )}

      {!isLoading && !error && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage 
                src={profile?.profileImage?.[0]?.url?.replace("ipfs://", "https://api.universalprofile.cloud/ipfs/") || "/placeholder.svg"} 
                alt={profile?.name} 
              />
              <AvatarFallback>{profile?.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{profile?.name || "Anonymous"}</h1>
                <Badge className="ml-2">
                  <Award className="mr-1 h-3 w-3" />
                  Top Trader
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">
                  {address ? `${address.substring(0, 6)}...${address.substring(38)}` : "No account connected"}
                </p>
                {address && (
                  <button 
                    onClick={handleCopyAddress}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Copy address"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShareProfile}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Profile
          </Button>
        </div>
      )}
    </div>
  );
}
