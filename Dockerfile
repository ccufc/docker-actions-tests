FROM node:18.20.4-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i --quiet

COPY . ./
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
