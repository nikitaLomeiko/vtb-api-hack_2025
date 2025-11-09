from node:24-alpine3.21 as build

workdir /app
copy yarn.lock package.json .
run yarn install
copy . .
run yarn build

from nginx:mainline

copy --from=build /app/dist /usr/share/nginx/html
