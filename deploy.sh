#!/bin/bash

if ["$APP_SIDE" == "FRONTEND"]; then
  cd client
  npm install
  npm start
else
  cd server
  npm install
  npm build
fi