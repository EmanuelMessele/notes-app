FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run","dev","--", "--host"]
# remember the frontend uses Vite --> we --host to tell Vite
# to listen on all network interfaces so Docker can forward all traffic thru it
