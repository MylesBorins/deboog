const EventEmitter = require('events');

const test = require('tap').test;
const rewire = require('rewire');
const defaultBrowser = require('x-default-browser');

const deboog = rewire('../lib');
const comingSoon = deboog.__get__('comingSoon');

const browsers = ['firefox', 'chrome', 'edge'];

var revert = deboog.__set__('launcher', () => {
  const proc = new EventEmitter();
  setTimeout(_ => {
    proc.emit('exit');
  }, 10)
  return proc;
});

test('deboog: comingSoon()', (t) => {
  t.plan(3);
  browsers.forEach((browser) => {
    t.match(comingSoon(browser), browser, 'message should contain appropriate browser');
  });
})

test('deboog(): each vendor', (t) => {
  t.plan(6)
  browsers.forEach((browser) => {
    deboog('some/path/lol.js', browser, (err, msg) => {
      t.error(err);
      t.match(msg, browser, 'message should contain the appropriate browser');
    });
  });
});

test('deboog(): default browser', (t) => {
  t.plan(7)
  defaultBrowser((err, res) => {
    t.error(err);
    deboog('lol/path.mjs', 'default', (er, msg) => {
      t.error(er);
      t.match(msg, res.commonName, 'message should contain the default browser');
    });
    deboog('lol/path.mjs', (er, msg) => {
      t.error(er);
      t.match(msg, res.commonName, 'message should contain the default browser');
    });
    deboog((er, msg) => {
      t.error(er);
      t.match(msg, res.commonName, 'message should contain the default browser');
    });
  });
});
