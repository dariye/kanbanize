#!/bin/bash

node_modules/.bin/concurrently \
  --kill-others-on-fail \
  "sleep 10 && micro-dev" \
  "npm run ngrok"
