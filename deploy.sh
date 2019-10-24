#!/bin/bash

FRONTEND_TARGET="FRONTEND"

if [ $APP_SIDE = $FRONTEND_TARGET ]
  then
    cd client
else
    cd server
fi

npm install
npm run build