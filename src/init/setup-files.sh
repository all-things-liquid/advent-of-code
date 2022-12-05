#!/bin/bash

toArray(){
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
      echo "Arguments: <input_string> <delim> <output_array>"
      exit 1
  fi

  IFS="$2" read -ra "$3" <<< "$1"
}

toSpinalCase() {
  if [ -z "$1" ] || [ -z "$2" ]; then
      echo "Arguments: <string> <delim>"
      exit 1
  fi

  local arr
  toArray "$1" "$2" arr

  local IFS="-"
  echo "${arr[*]}"
}

toLowercase(){
  if [ -z "$1" ] ; then
      echo "Arguments: <string>"
      exit 1
  fi
  echo "$1" | tr '[:upper:]' '[:lower:]'
}

toCamelCase(){
  if [ -z "$1" ] || [ -z "$2" ]; then
      echo "Arguments: <string> <delim>"
      exit 1
  fi

  local arr
  toArray "$1" "$2" arr

  pattern="s/(^)(.)/\L\$2/g ; s/( )(\w)/\U\$2/g"
  perl -pe "$pattern" <<< "${arr[*]}"

}

initFolderAndFiles(){
  if [ -z "$1" ]  || [ -z "$2" ] || [ -z "$3" ]; then
      echo "Arguments: <folder_name> <file_name> <html_path>"
      exit 1
  fi

  echo "Jumping to $1!"
  mkdir "$1"
  cd "$1" || exit 1

  echo "Initialising files..."
  mv "$3" .
  touch "$2.ts" "$2.test.ts"

  echo "The following files were created in $1: "
  ls -1
}
