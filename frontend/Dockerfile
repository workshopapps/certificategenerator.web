FROM node:16.18.1 as builder-step

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install 

COPY . /frontend/

EXPOSE 3000

CMD ["npm", "start"]
