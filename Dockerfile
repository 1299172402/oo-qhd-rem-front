#FROM docker.bytzdev.xyz/front-base-node16-nginx123:latest AS build
FROM docker.bytzdev.xyz/front-base-node14-nginx121:latest AS build

ENV APP_ENV=build
#RUN npx browserslist@latest --update-db
RUN npm install yarn -g --force


WORKDIR /app

COPY ./ /app

COPY scripts/docker-entrypoint.sh /

RUN npm config set registry https://registry.npm.taobao.org --global \
    npm config set disturl https://npm.taobao.org/dist --global \
    yarn config set registry https://registry.npm.taobao.org --global \
    yarn config set disturl https://npm.taobao.org/dist --global
RUN npm install --registry=https://registry.npm.taobao.org

# 这里的build,并不会作为最终的运行使用, 只是为了验证代码是否可build, 所以build完了就删掉
RUN yarn  && yarn  ${APP_ENV} && rm -rf /app/dist && chmod +x /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
