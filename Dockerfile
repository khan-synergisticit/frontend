FROM node:latest 

WORKDIR /app

RUN rm -r ./

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "index.js"] 