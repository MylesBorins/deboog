#!/usr/bin/env node

const deboog = require('../lib');
const argv = process.argv.slice(2);

var browser = 'default';

if (argv[0] && argv[0].match('--')) {
  browser = argv.shift().slice(2);
}

deboog(argv, browser, (err, msg) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    return;
  }
  console.log(msg);
});
