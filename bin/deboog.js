#!/usr/bin/env node

const argv = require('yargs').argv;

const deboog = require('../lib');

var browser = 'default';

if (argv.chrome) browser = 'chrome';
if (argv.firefox) browser = 'firefox';
if (argv.edge) browser = 'edge';

deboog(argv._[0], browser, (err, msg) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
    return;
  }
  console.log(msg);
});
