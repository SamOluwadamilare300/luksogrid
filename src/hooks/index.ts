import { useEffect, useState } from "react";
import { ERC725 } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import 'isomorphic-fetch';

interface UniversalProfileData {
  name?: string;
  description?: string;
  profileImage?: { url: string }[];
  backgroundImage?: { url: string }[];
  tags?: string[];
  links?: { title: string; url: string }[];
}

const RPC_URLS: Record<"mainnet" | "testnet", string> = {
  mainnet: "https://rpc.mainnet.lukso.network",
  testnet: "https://rpc.testnet.lukso.network",
};

export function useUniversalProfile(
  address: string | undefined,
  network: "mainnet" | "testnet" = "testnet", // default to testnet
  ipfsGateway = "https://api.universalprofile.cloud/ipfs"
) {
  const [profile, setProfile] = useState<UniversalProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {

        const erc725 = new ERC725(
          lsp3ProfileSchema as any,
          address,
          RPC_URLS[network],
          { ipfsGateway }
        );

        // const erc725js = new ERC725(
        //   lsp3ProfileSchema,
        //   address,
        //   'https://4201.rpc.thirdweb.com',
        //   { ipfsGateway: 'https://api.universalprofile.cloud/ipfs' }
        // );
        
      
        const profileData = await erc725.fetchData("LSP3Profile");
        

        if (
          profileData &&
          typeof profileData.value === "object" &&
          profileData.value !== null &&
          "LSP3Profile" in profileData.value
        ) {
          const lsp3Profile = (profileData.value as any).LSP3Profile;
          setProfile({
            name: lsp3Profile.name,
            description: lsp3Profile.description,
            profileImage: lsp3Profile.profileImage,
            backgroundImage: lsp3Profile.backgroundImage,
            tags: lsp3Profile.tags,
            links: lsp3Profile.links,
          });
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching Universal Profile:", err);
        setError("Failed to load profile data");
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [address, network, ipfsGateway]);

  return { profile, isLoading, error };
}




// import { useEffect, useState } from "react";
// import { ERC725 } from "@erc725/erc725.js";
// import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

// interface UniversalProfileData {
//   name?: string;
//   description?: string;
//   profileImage?: { url: string }[];
//   backgroundImage?: { url: string }[];
//   tags?: string[];
//   links?: { title: string; url: string }[];
// }

// type Network = "mainnet" | "testnet";

// export function useUniversalProfile(address: string | undefined, network: Network) {
//   const [profile, setProfile] = useState<UniversalProfileData | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Use thirdweb endpoints for reliability
//   const rpcUrl =
//     network === "mainnet"
//       ? "https://42.rpc.thirdweb.com"
//       : "https://4201.rpc.thirdweb.com";

//   useEffect(() => {
//     if (!address) {
//       setProfile(null);
//       return;
//     }

//     const fetchProfile = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const erc725 = new ERC725(
//           lsp3ProfileSchema as any,
//           address,
//           rpcUrl,
//           { ipfsGateway: "https://api.universalprofile.cloud/ipfs" }
//         );

//         const profileData = await erc725.fetchData("LSP3Profile");

//         if (
//           profileData &&
//           typeof profileData.value === "object" &&
//           profileData.value !== null &&
//           "LSP3Profile" in profileData.value
//         ) {
//           const lsp3Profile = (profileData.value as any).LSP3Profile;
//           setProfile({
//             name: lsp3Profile.name,
//             description: lsp3Profile.description,
//             profileImage: lsp3Profile.profileImage,
//             backgroundImage: lsp3Profile.backgroundImage,
//             tags: lsp3Profile.tags,
//             links: lsp3Profile.links,
//           });
//         } else {
//           setProfile(null);
//         }
//       } catch (err) {
//         console.error("Error fetching Universal Profile:", err);
//         setError("Failed to load profile data");
//         setProfile(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [address, rpcUrl]);

//   return { profile, isLoading, error };
// }
