import withPWA from 'next-pwa';
/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig = withPWA({
  // PWA options
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})({
  // Nextjs options
  reactStrictMode: true,
});

export default nextConfig;
