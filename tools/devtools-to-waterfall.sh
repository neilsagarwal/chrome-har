#!/bin/bash

node harCreator.js $1 $2

file1=index.html
line=39

{ head -n $(($line-1)) $file1; cat $3.har; tail -n +$line $file1; } > $4.html
