/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'http://127.0.0.1:8002/api/v1/:path*'
            }
        ];
    }
};

export default nextConfig;
