'use strict';

const defaultBrowser = require('x-default-browser');
const chromeLink = 'chrome-devtools://devtools/remote/serve_file/@521e5b7e2b7cc66b4006a8a54cb9c4e57494a5ef/inspector.html?experiments=true&v8only=true&ws=localhost:5858/node';

var launch = require('./launch');

function comingSoon(browser) {
  return `Coming Soon: inspector launched with ${browser} dev tools`;
}

function spawnBrowser(browser) {
  let proc;
  if (browser === 'chrome') {
    proc = launch.chrome('')
  }
  else {
    comingSoon(browser);
    proc = {
      on: _ => {},
      kill: _ => {}
    }
  }
  return proc;
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

  const debug = launch.debug(options);

  if (browser && browser !== 'default') {
    let proc = spawnBrowser(browser);
    cb(null, debug, proc, browser);
    return;
  }

  defaultBrowser((err, res) => {
    browser = res.commonName;
    if (err) {
      debug.kill();
      cb(new Error('Unable to detect default browser for system'));
      return;
    };
    let proc = spawnBrowser(browser);
    cb(null, debug, proc, browser);
    return;
  });
}

module.exports = deboog;
