#!/bin/bash

frontend_target="client/Procfile"
if [ "$PROCFILE" == "$frontend_target" ]; then
  npm install --prefix client
  npm run build --prefix client
else
  npm install --prefix server
  npm run build --prefix server
fi
