FROM node:14.15.4-buster-slim
LABEL author="pmiralles"

RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src

RUN npm install --silent

EXPOSE 3000
CMD ["npm", "start"]