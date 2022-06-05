FROM node:16

WORKDIR /var/www/html

COPY . /var/www/html

RUN npm install

CMD ["npm", "run", "dev"]