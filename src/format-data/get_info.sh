#!/bin/sh
let counter=0
  top -bn 1 > info.txt
  echo $counter
  counter=$((counter+1))
  sensors -f | grep temp1 > temperature.txt
kill

