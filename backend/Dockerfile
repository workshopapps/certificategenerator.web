FROM node:16.18.1 as builder-step

WORKDIR /backend

COPY package*.json /backend/

RUN npm install 

COPY . /backend/

EXPOSE 5000

CMD ["npm", "start"]