/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smartshopbaby.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },
  async redirects() {
    return [
      // Preserve SEO: redirect old WordPress page slugs to new routes
      {
        source: '/siege-auto-groupe-2-3-isofix-crash-test',
        destination: '/comparatifs/siege-auto-groupe-2-3-isofix-crash-test',
        permanent: true,
      },
      {
        source: '/chauffe-biberon-guide-comparatif-les-meilleurs',
        destination: '/comparatifs/chauffe-biberon-guide-comparatif-les-meilleurs',
        permanent: true,
      },
      {
        source: '/biberon-bebe-conseils-selection-sterilisation',
        destination: '/comparatifs/biberon-bebe-conseils-selection-sterilisation',
        permanent: true,
      },
      {
        source: '/comparatif-couches-bebe',
        destination: '/comparatifs/comparatif-couches-bebe',
        permanent: true,
      },
      {
        source: '/meilleur-parc-bebe-en-2023-guide-dachat-complet-et-comparatif',
        destination: '/comparatifs/meilleur-parc-bebe-en-2023-guide-dachat-complet-et-comparatif',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
