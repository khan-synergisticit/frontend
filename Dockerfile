FROM node:latest 

WORKDIR /


COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["node", "index.js"] 