/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [
            "media0.giphy.com",
            "media1.giphy.com",
            "media2.giphy.com",
            "media3.giphy.com",
            "media4.giphy.com",
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/trending",
                permanent: true,
            },
        ];
    },
};
