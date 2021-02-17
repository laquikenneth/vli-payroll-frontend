FROM node:14.15-alpine

# https://github.com/webplug-lab/vue-dockerize.git

WORKDIR /app

COPY ./package*.json ./ 

RUN npm install

RUN npm install -g @vue/cli

COPY . ./

RUN chmod g+s /app

CMD [ "npm", "run", "serve" ]
