/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["isecqywtiwzstvxppsbd.supabase.co"], // Allow loading images from localhost
    domains: ["http://127.0.0.1:8000", "localhost"],
  },
  async rewrites() {
    return [
      {
        // Match any request that starts with /Suk_bederete/media/products/
        source: "/Suk_bederete/media/:path*",
        // Forward the request to your Django backend
        destination: "http://localhost:8000/Suk_bederete/media/:path*",
      },
    ];
  },
};

export default nextConfig;
