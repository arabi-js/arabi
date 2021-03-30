#!/usr/bin/env bash

pkg=$(which jq 2>&1 > /dev/null \
  && cat "$2"/package.json | jq '.name' \
  || echo $2)

declare -A emojis

emojis["linting"]=📝
emojis["building"]=📦
emojis["testing"]=🔍
emojis["formatting"]=📑
emojis["watching"]=👀
emojis["analyzing"]=📈

echo "┏━━━ ${emojis[$1]} $1: $pkg ━━━━━━━━━━━━━━━━━━━"

