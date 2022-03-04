#!/bin/sh
  top -bn 1 > info.txt
  sensors -f | grep temp1 > temperature.txt
kill

