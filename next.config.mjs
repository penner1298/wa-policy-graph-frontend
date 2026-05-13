/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8002';
        return [
            {
                source: '/api/v1/:path*',
                destination: `${backendUrl}/api/v1/:path*`
            }
        ];
    }
};

export default nextConfig;
