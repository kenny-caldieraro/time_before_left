FROM node:16
WORKDIR /TIME_BEFORE_LEFT
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]