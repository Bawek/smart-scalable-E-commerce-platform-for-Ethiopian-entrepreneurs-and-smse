/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',        // Protocol is http
        hostname: 'localhost',   // Only allow images from localhost
        port: '8000',            // Port to match (if your server runs on port 8000)
        pathname: '/images/**',  // Allow images under '/images/*' (use ** for any subdirectories)
      },

    ],
  },
  async rewrites() {
    return [
      {
        // Match any request that starts with /Suk_bederete/media/products/
        source: "/Suk_bederete/media/:path*",
        // Forward the request to your Django backend at localhost:8000
        destination: "http://localhost:8000/Suk_bederete/media/:path*",
      },
    ];
  },
};

export default nextConfig;
