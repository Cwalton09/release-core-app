const nextConfig = {
  async redirects() {
    return [
      // Send www traffic to the main domain so Google sees one version of the site.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.release-core.com" }],
        destination: "https://release-core.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
