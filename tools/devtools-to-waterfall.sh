#!/bin/bash

filepath=""
node harCreator.js $filepath/$1.json

file1=index.html
line=39

{ head -n $(($line-1)) $file1; cat $1.har; tail -n +$line $file1; } > $1.html







