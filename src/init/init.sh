#!/bin/bash

# --------- DEFAULT CONFIGURATION --------- #
# Filenames
BANNER="banner.txt"
SETUP_FILES="setup-files.sh"
SETUP_PROBLEM="setup-problem.sh"
GET_PROBLEM_INFO="get-problem-info.sh"

# Regex for date format validation
RX_ADVENT_DAY='^([1]{0,1}[0-9]{1})$|^2[0-4]$'
RX_ADVENT_YEAR='^201[5-9]$|^20[2-9][0-9]$'

# Other
UPCOMING_RELEASE_DAY=$(TZ=UTC+5 date "+%-d")
WORKDIR="$(pwd)/src"
CURRENT_YEAR=$(date "+%Y")
CURRENT_DAY=$(date "+%-d")
# ----------------------------------------- #

cd "$WORKDIR" || exit 1

if [ -z "$1" ]; then
    echo "init: Must specify a scripts directory as first argument"
    exit 1
else
  SCRIPTS_FOLDER=$1
fi

if [ -f "$SCRIPTS_FOLDER/$BANNER" ] && [ -f "$SCRIPTS_FOLDER/$BANNER" ] && [ -f "$SCRIPTS_FOLDER/$BANNER" ]; then
  . "$SCRIPTS_FOLDER/$SETUP_FILES"
  . "$SCRIPTS_FOLDER/$SETUP_PROBLEM"
  . "$SCRIPTS_FOLDER/$GET_PROBLEM_INFO"
else
  echo "Missing files"
  exit 1
fi

# Print banner, if there is one
if [ -f "$SCRIPTS_FOLDER/$BANNER" ]; then
    chmod -xw "$SCRIPTS_FOLDER/$BANNER"
    cat "$SCRIPTS_FOLDER/$BANNER"
fi
date "+%a, %d %b %Y - %X"

declare y d
selectProblemToSetup y d

echo "Configuring folder for $y/$d..."
for f in "$y/$d"*; do
    if [ -e "$f" ]; then
      echo "Directory and files have already been located at $WORKDIR/$f"
      exit 1
    fi
done

if [ ! -d "$y" ]; then
    echo "Tackling the first problem of that year, I see..."
    mkdir "$y"
fi

echo "Jumping to year $y!"
cd "$y" || exit 1

echo "Configuring folder and files..."
html_path="$WORKDIR/$y/$y-$d.html"
getProblemDescription "$y" "$d" "$html_path"

title=$(getProblemTitle "$d" "$html_path")
function_name=$(toCamelCase "$title" " ")
file_name=$(toLowercase "$(toSpinalCase "$title" " ")")
folder_name="${d}-${file_name}"

echo "Creating folder for problem ${d}: ${title}..."
initFolderAndFiles "$folder_name" "$file_name" "$html_path"
