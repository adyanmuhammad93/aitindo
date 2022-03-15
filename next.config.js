const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({ cssModules: true })
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    WEB_NAME: process.env.WEB_NAME,
    HOST_API: process.env.HOST_API,
    CART_HOST_API: process.env.CART_HOST_API,
    ORDER_HOST_API: process.env.ORDER_HOST_API,
    CUSTOMERDB_HOST_API: process.env.CUSTOMERDB_HOST_API,
    HOST_MAILSERVICE_API: process.env.HOST_MAILSERVICE_API,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    MIDTRANS_SNAP: process.env.MIDTRANS_SNAP,
    MIDTRANS_KEY: process.env.MIDTRANS_KEY,
    ID_CATEGORY: process.env.ID_CATEGORY,
    PORT: process.env.PORT,
    IS_DEV: process.env.IS_DEV,
    IS_STAGING: process.env.IS_STAGING
  }

};
