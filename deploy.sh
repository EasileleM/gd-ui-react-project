#!/bin/bash

frontend_target="FRONTEND"

if [ "$APP_SIDE" = "$frontend_target" ]; then
  cd client
  npm install
  npm run build
  npm install -g serve
  serve -s build
else
  cd server
  npm install
  npm run build
fi