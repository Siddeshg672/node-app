FROM node:18-bullseye

ENV HOME=/home/app
WORKDIR $HOME/node_docker

RUN apt-get update && apt-get install -y htop \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
