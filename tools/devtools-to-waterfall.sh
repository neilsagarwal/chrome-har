#!/bin/bash

filepath=<Insert File Path Here>/lighthouse-http-alexa
node harCreator.js $filepath/$1.json

file1=index.html
line=37

{ head -n $(($line-1)) $file1; cat $1.har; tail -n +$line $file1; } > $1.html







