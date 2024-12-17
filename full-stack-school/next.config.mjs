/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com', // Main Cloudinary image domain
        pathname: '/**', // Adjust if you need specific path control
      },
    ],
  },
  
};

export default nextConfig;
