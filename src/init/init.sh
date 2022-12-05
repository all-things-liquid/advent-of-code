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