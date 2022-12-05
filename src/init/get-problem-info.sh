#!/bin/bash

getProblemDescription() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
      echo "Arguments: <year> <day> <path>"
      exit 1
  fi

  RX_TITLE="s@(^.*<h2>--- Day $2: )(.*)( ---</h2>.*)@\2@p"
  curl "https://adventofcode.com/$1/day/$2" -o "$3"
  echo "Fetched problem description, now located at $3"
}

getProblemTitle(){
  if [ -z "$1" ]  || [ -z "$2" ]; then
      echo "Arguments: <day> <html_path>"
      exit 1
  fi
  RX_TITLE="s@(^.*<h2>--- Day $1: )(.*)( ---</h2>.*)@\2@p"
  sed -rn "$RX_TITLE" "$2"
}