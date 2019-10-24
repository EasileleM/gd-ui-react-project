#!/bin/bash

frontend_target="FRONTEND"

if [ "$APP_SIDE" = "$frontend_target" ]; then
  cd client
  npm install
  npm start
else
  cd server
  npm install
  npm build
fi