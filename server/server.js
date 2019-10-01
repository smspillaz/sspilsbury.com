/* eslint consistent-return:0 */
require('@babel/polyfill');

const express = require('express');

const serverApi = require('./api/api');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
if (process.env.SERVERLESS !== '1') {
    const { resolve } = require('path');
    const setup = require('./middlewares/frontendMiddleware');

    setup(app, {
      outputPath: resolve(process.cwd(), 'build'),
      publicPath: '/',
    });
}

// Start your app.
module.exports = app;
