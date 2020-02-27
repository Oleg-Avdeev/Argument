#!/bin/bash
echo "Script: $0"
echo "Path: $1"
echo "Branch: $2"

if pgrep "$2"; then pkill "$2"; fi
cd "$1"
nohup node "$2/server" > "logs/$2.log" 2>&1 &
