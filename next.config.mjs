/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    secretKey: "token@@encryption@@mango@@application",
    localStorageTokenKey: "Atoken",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
