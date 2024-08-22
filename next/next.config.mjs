/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.iran.liara.space",
            },
        ],
    },
};

export default nextConfig;
