var spawn = require('child_process').spawn;
var chromelaunch = require('chrome-launch');

function debug(options) {
  options.unshift('--inspect');
  const proc = spawn('node', options, {
    stdio: 'inherit'
  });
  return proc;
}

module.exports = {
  debug: debug,
  chrome: chromelaunch
};
