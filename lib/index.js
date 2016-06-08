const defaultBrowser = require('x-default-browser');

function comingSoon(browser) {
  return `Coming Soon: inspector launched with ${browser} dev tools`;
}

function deboog(file, browser, cb) {
  if (typeof browser === 'function') {
    cb = browser;
    browser = 'default';
  }
  if (!file) {
    cb(new Error('you need to provide a file'));
    return;
  }
  if (browser && browser !== 'default') {
    cb(null, comingSoon(browser))
    return;
  }
  defaultBrowser((err, res) => {
    if (err) {
      cb(new Error('Unable to detect default browser for system'));
      return;
    };
    cb(null, comingSoon(res.commonName));
    return;
  });
}

module.exports = deboog;
