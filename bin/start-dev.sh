#!/bin/bash

node_modules/.bin/concurrently \
  --kill-others-on-fail \
  "sleep 10 && nodemon ./app" \
  "npm run ngrok"
