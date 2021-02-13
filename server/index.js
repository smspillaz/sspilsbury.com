/* eslint consistent-return:0 import/order:0 */
const app = require('./server');
const argv = require('./argv');
const port = require('./port');
const logger = require('./logger');

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);

  return null;
});
