/** @type {import('next').NextConfig} */

module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tailwindui.com',
              port: '',
              pathname: '**',
            },
          ],
          domains: ['tailwindui.com','images.unsplash.com'],
          dangerouslyAllowSVG: true,
    },
  };
  
  export default  nextConfig;
  
