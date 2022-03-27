#!bin/bash
cd ./docker-entrypoint-initdb.d

mongo -u admin -p admin ./init.js
