#!/bin/bash

set -e

cd /app

# 记录是否已经编译过的文件
CMP_BUILT_FLAG='/cmp-built'

if [ -e "${CMP_BUILT_FLAG}" ];
then
  echo "Already built, continue to next steps."
else
  echo "Building project with 'yarn'..."
  # [ -n ${SW_ENV+x} ] ||
  if [ "$APP_ENV" = "prod" ] ;
  then
    npm run build:prod;
  else
    yarn build;
  fi

  echo "Installing artifacts and config files..."
  #mkdir -p /app
 # cp  /dist /app/dist
  cp -a /app/dist/* /var/www/
  cp -a /app/build/nginx.conf /etc/nginx/nginx.conf
  cp -a /app/build/nginx-site-${APP_ENV}.conf /etc/nginx/conf.d/default.conf

  touch "${CMP_BUILT_FLAG}"
fi

chmod -R 555 /var/www
echo "Starting nginx server..."

exec "$@"