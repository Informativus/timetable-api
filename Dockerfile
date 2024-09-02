FROM node:22-alpine
WORKDIR /timetable-api
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

CMD npm run start:dev 
