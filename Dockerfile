FROM node:17-alpine as build-image
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm ci
RUN npx tsc

FROM node:17-alpine
RUN apk update
RUN apk upgrade
RUN apk add --no-cache ffmpeg
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build-image ./usr/src/app/dist ./dist
RUN npm ci --production

#Write your telegram bot token here
ENV TELEGRAM_BOT_TOKEN=[userToken]
EXPOSE 8080
CMD [ "node", "dist/app.js" ]