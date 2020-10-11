#!/bin/bash

yarn build

aws s3 cp dist s3://vue-timer --recursive --profile default
