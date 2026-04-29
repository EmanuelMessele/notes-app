FROM node:22-alpine 
# base image that already has node 22 installed

WORKDIR /app
# sets directory app in our container --> like doing mkdir app and cd app in the container

COPY package*.json ./ 
# copy both package.json and package.lock.json into the container

RUN npm install
# installs all dependencies

COPY . .
# copies all code

EXPOSE 3000
# documents this container uses port 3000

CMD ["node", "index.js"]
# command that runs when container starts --> production so use node not nodemon
