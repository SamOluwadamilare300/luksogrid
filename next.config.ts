// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// 	images: {
// 		domains: ["res.cloudinary.com"],
// 	},
// };

// export default nextConfig;



const nextConfig = {
	images: {
	  domains: ["res.cloudinary.com"],
	},
	webpack: (config: { resolve: { fallback: any; }; }, { }: any) => {
	  // Avoid bundling 'pino-pretty' (a Node.js module not needed in the browser)
	  config.resolve.fallback = {
		...config.resolve.fallback, // Preserve other fallbacks
		"pino-pretty": false,      // Disable bundling attempts
	  };
  
	  return config;
	},
  };
  
  module.exports = nextConfig;