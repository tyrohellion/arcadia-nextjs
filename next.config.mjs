/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "griffon.octane.gg",
        port: "",
      },
      {
        protocol: "https",
        hostname: "octane-content.s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;