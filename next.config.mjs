/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/brandlogos/**",
      },
    ],
  },
};

export default nextConfig;
