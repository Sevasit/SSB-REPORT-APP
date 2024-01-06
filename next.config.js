/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["profile.line-scdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile.line-scdn.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
