#!/usr/bin/env node

const deboog = require('../lib');
const argv = process.argv.slice(2);

var browser = 'default';

if (argv[0] && argv[0].match('--')) {
  browser = argv.shift().slice(2);
}

deboog(argv, browser, (err, proc, browser) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    return;
  }
  
  process.on('SIGINT', ()=> {
    console.log('💔 FORCE QUIT 💔');
    proc.kill();
    return;
  });
  
  proc.on('exit', () => {
    console.log(`Thanks for using Deboog to debug using the ${browser} dev tools!`);
    return;
  });
});
