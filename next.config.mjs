/** @type {import('next').NextConfig} */
import path from "path";
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },reactStrictMode: true,
};

export default nextConfig;
