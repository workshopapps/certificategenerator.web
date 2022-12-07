FROM node:16.10.0 as builder-step

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install 

COPY . /frontend/

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]


#EXPOSE 3000

#CMD ["npm", "start"]
