#!/usr/bin/env node

const deboog = require('../lib');
const argv = process.argv.slice(2);

var browser = 'default';

if (argv[0] && argv[0].match('--')) {
  browser = argv.shift().slice(2);
}

deboog(argv, browser, (err, debug, proc, browser) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    return;
  }
  
  process.on('SIGINT', _ => {
    console.log('💔 FORCE QUIT 💔');
    debug.kill();
    return;
  });
  
  debug.on('exit', _ => {
    console.log(`Thanks for using Deboog to debug using the ${browser} dev tools!`);
    return;
  });
  
  proc.on('exit', _ => {
    debug.kill();
    console.log('Browser Window Closed');
    return;
  });
});
