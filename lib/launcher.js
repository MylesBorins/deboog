var spawn = require('child_process').spawn;

function launcher(options) {
  options.unshift('--inspect');
  const proc = spawn('node', options, {
    stdio: 'inherit'
  });
  return proc;
}

module.exports = launcher;
