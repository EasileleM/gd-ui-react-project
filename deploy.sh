#!/bin/bash

if ["$APP_SIDE" == "FRONTEND"]; then
  cd client
  npm install
  npm build
else
  cd server
  npm install
  npm build
fi