/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@frigg/domain', '@frigg/engine', '@frigg/ai']
}

export default nextConfig
