#!/bin/bash

isAdventTime() {
  if [[ $CURRENT_YEAR =~ $RX_ADVENT_YEAR && $CURRENT_DAY =~ $RX_ADVENT_DAY ]]; then
    true
  else
    false
  fi
}

isDailyProblemAvailable() {
  if [[ ($CURRENT_DAY > $UPCOMING_RELEASE_DAY) ]]; then
    false
  else
    true
  fi
}

selectProblemToSetup() {
  local daily_setup year day

  if isAdventTime; then
       echo "Hey! Looks like it's still advent time!"
       if isDailyProblemAvailable; then
          echo "Do you want to setup files for today? (Y/n)"
          read -r daily_setup
          daily_setup=$(echo "${daily_setup:-"y"}" | tr '[:upper:]' '[:lower:]')
       else
          echo "...Today's problem is not available yet though."
       fi
  else
      echo "Hey! Advent time is over. No problem available today"
  fi
  daily_setup="${daily_setup:-"n"}"

  case $daily_setup in
  "y")
    year=$CURRENT_YEAR
    day=$CURRENT_DAY
    ;;
  "n")
    while [[ ! $year =~ $RX_ADVENT_YEAR ]]; do
    echo "Enter a year (2015-20XX)"
    read -r year
    done

    while [[ ! $day =~ $RX_ADVENT_DAY ]]; do
    echo "Enter a day (1-24)"
    read -r day
    done
    ;;
  *)
    echo "Only acceptable answers are y (yes) or n (no)!"
    exit 1
  esac
  read -r "$1" "$2" <<< "$year $day"
}