#!/usr/bin/env node

'use strict';

const fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  parser = require('..');

Promise.promisifyAll(fs);

if (process.argv.length !== 4) {
  process.exit(1);
}

const perflogPath = process.argv[2];
const savePath = process.argv[3];


fs
  .readFileAsync(path.resolve(perflogPath), 'utf8')
  .then(JSON.parse)
  .then(messages => parser.harFromMessages(messages))
  .then(har => JSON.stringify(har, null, 0))
  .then(har =>
    fs.writeFileAsync(path.resolve(savePath), har, 'utf8')
  );
