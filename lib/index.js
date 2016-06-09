const defaultBrowser = require('x-default-browser');

var launcher = require('./launcher');

function comingSoon(browser) {
  return `Coming Soon: inspector launched with ${browser} dev tools`;
}

function deboog(options, browser, cb) {
  if (typeof options === 'string') {
    options = [options];
  }
  if (typeof options === 'function') {
    cb = options;
    options = [];
    browser = 'default';
  }
  if (typeof browser === 'function') {
    cb = browser;
    browser = 'default';
  }

  const proc = launcher(options);

  if (browser && browser !== 'default') {
    comingSoon(browser);
    cb(null, proc, browser);
    return;
  }

  defaultBrowser((err, res) => {
    browser = res.commonName;
    if (err) {
      proc.kill();
      cb(new Error('Unable to detect default browser for system'));
      return;
    };
    comingSoon(browser);
    cb(null, proc, browser)
    return;
  });
}

module.exports = deboog;
