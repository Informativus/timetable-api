FROM node:22-alpine

WORKDIR /timetable-api
COPY package.json package-lock.json ./

RUN npm install --production
COPY dist ./dist
COPY .env.dev .env

ENTRYPOINT ["npm", "run", "start:prod"]
