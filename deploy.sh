#!/bin/bash

frontend_target="client/Procfile"
echo "1"
if [ "$PROCFILE" == "$frontend_target" ]; then
  echo "2"
  npm install --prefix client
  npm run build --prefix client
  echo "3"
else
  npm install --prefix server
fi
echo "4"
