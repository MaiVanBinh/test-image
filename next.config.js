const webpack = require('webpack');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// https://github.com/vercel/next.js/blob/canary/errors/non-standard-node-env.md
const assetPrefixURL = {
  production: "https://storage.googleapis.com/goyolo-production",
  canary: "https://storage.googleapis.com/goyolo-canary",
  uat: "https://storage.googleapis.com/goyolo-uat",
  development: "http://localhost:3000",
};
const isProd = process.env.APP_ENV === "production";
const isCanary = process.env.APP_ENV === "canary";

const moduleExports = {
  // Use the CDN in production/uat and localhost for development.
  // productionBrowserSourceMaps: true,
  assetPrefix: assetPrefixURL[process.env.APP_ENV],
  images: {
    domains: ['storage.googleapis.com', 'static.vexere.com', 'static.vexere.net', 'goyolo.com', 'canary-goyolo.vexere.com', 'uat-goyolo.vexere.net'],
    formats: ['image/avif', 'image/webp'],
    // path: '',
    // loader: 'imgix'
  },
  env: {
    APP_ENV: process.env.APP_ENV || process.env.NODE_ENV,
    VAPI_URL:
      isProd || isCanary
        ? "https://api.vexere.com"
        : "https://uat-api.vexere.net",
    GOM_SERVICE_URL: isProd
      ? "https://gom.vexere.com"
      : isCanary
        ? "https://canary-gom.vexere.com"
        : "https://uat-gom.vexere.net",
    VROUTE_BASE_URL: isProd
      ? "https://vroute.vexere.com"
      : isCanary
        ? "https://canary-vroute.vexere.com"
        : "https://uat-vroute.vexere.net",
    USER_PROFILE_URL:
      isProd || isCanary
        ? "https://user-profile-service.vexere.com"
        : "https://uat-user-profile-service.vexere.net",
    VGATE_BASE_URL:
      isProd || isCanary
        ? "https://vgate.vexere.com"
        : "https://uat-vgate.vexere.net",
    HPL_BASE_URL: "http://api.hophilong.vn",
    GOYOLO_URL: isProd ? "https://goyolo.com" : isCanary ? "https://canary-goyolo.vexere.com" : "https://uat-goyolo.vexere.net",
    VCONFIGURATION:
      isProd || isCanary
        ? "https://vconfiguration.vexere.com"
        : "https://uat-vconfiguration.vexere.net",
    VCMS_BASE_URL:
      isProd || isCanary
        ? "https://vcms.vexere.com"
        : "https://uat-vcms.vexere.net",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  plugins: [
    // Ignore all locale files of moment.js
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /vi/),
  ],
  // https://github.com/vercel/next.js/issues/30429
  // swcMinify: true, disable until above issue is resolved.
  // async redirects() {
  //     return [{
  //         source: '/',
  //         destination: '/flight',
  //         permanent: true,
  //     }]
  // }
};

module.exports = moduleExports;
