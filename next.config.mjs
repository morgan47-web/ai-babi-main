/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin",
        {
          runtimeModules: {
            i18n: ["@lingui/core", "i18n"],
            trans: ["@lingui/react", "Trans"],
          },
        },
      ],
    ],
  },
  output: process.env.OUTPUT === "standalone" ? "standalone" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imageio.forbes.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
