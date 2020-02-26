#!/bin/bash
echo "Script: $0"
echo "Path: $1"
echo "Branch: $2"

cd "$1/$2"

if git log -1 ; then
    git remote update
    git status -uno

    processes=$(ps -ef | grep -o "$2" | wc -l)
    if ["&processes" -gt "4"] then
        echo "<font size="3" color="green">Server $2 is active and running</font>"
    fi
    
    # if cat "../$2.log" ; then
    # fi
else
    echo "Not a server!"
fi


