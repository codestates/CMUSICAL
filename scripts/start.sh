#!/bin/bash
cd /home/ubuntu/CMUSICAL/server

export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_ADDR=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_ADDR --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js
