/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "griffon.octane.gg",
        port: "",
      },
    ],
  },
};

export default nextConfig;
