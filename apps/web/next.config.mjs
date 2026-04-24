/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tollvord/domain', '@tollvord/engine', '@tollvord/ai']
}

export default nextConfig
