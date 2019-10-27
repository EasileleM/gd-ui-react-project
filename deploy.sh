#!/bin/bash

frontend_target="client/Procfile"

if [ "$PROCFILE" == "$frontend_target" ]; then
  npm install --prefix client
else
  npm install --prefix server
fi
