import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // These externals are required to get `genkit` to work as a server dependency
    // See: https://github.com/GoogleCloudPlatform/genkit/issues/1126
    config.externals.push(
      'superagent-proxy',
      'pac-proxy-agent',
      'proxy-agent'
    );
    return config;
  },
};

export default nextConfig;
