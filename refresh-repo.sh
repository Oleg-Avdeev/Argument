#!/bin/bash
# $1 — branch name
echo "Script: $0"
echo "Branch: $1"

echo "Changing directory to /home/$1"
cd "/home/$1"

echo "Trying to reset git repo"
if git reset --hard ; then
    git pull -f
    
    cd "/home/"
    echo "Killing running server (If exists)"
    if pgrep "$1"; then pkill "$1"; fi
    echo "Restarting server"
    nohup node "$1/server" > "$1.log" 2>&1 &
fi