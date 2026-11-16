/** @type {import('next').NextConfig} */

// Security headers sent with every response. The Content-Security-Policy
// is set per request (with a nonce) in middleware.js.
const securityHeaders = [
  // Force HTTPS for two years, including subdomains
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Never allow the site to be framed (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Stop browsers guessing content types (MIME sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Don't leak full URLs to other sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Turn off powerful browser features the site never uses
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), midi=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=(), interest-cohort=()',
  },
  // Isolate the browsing context from cross-origin windows
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Origin-Agent-Cluster', value: '?1' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  // Turn off the legacy XSS auditor (it can itself be abused); the CSP does this job now
  { key: 'X-XSS-Protection', value: '0' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // don't advertise the framework
  productionBrowserSourceMaps: false, // don't ship readable source to browsers
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

module.exports = nextConfig;
