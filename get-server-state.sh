#!/bin/bash
pwd
echo "Script: $0"
echo "Path: $1"
echo "Branch: $2"

cd "$1/$2"

if git log -1 ; then
    git remote update
    git status -uno

    if pgrep "$1" ; then
        echo "Server $1 is active and running"
    fi
    
    # if cat "../$2.log" ; then
    # fi
else
    echo "Not a server!"
fi


