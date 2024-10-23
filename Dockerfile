FROM node:latest 

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD ["npm", "run", "start"] 