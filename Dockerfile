FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem

RUN yarn
#EXPOSE $PORT
RUN yarn build:server
RUN chmod a+x ./prestart.sh
CMD ./prestart.sh && yarn start
