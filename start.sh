#!/bin/bash

cd server && node index.js &

cd ../../pwa && npx http-server