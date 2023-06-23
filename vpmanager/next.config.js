/** @type {import('next').NextConfig} */

const moment = require('moment-timezone');
const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // Configurar la zona horaria en el servidor de Next.js
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.TZ': JSON.stringify('America/Mexico_City'),
      })
    );
    return config;
  },
};

