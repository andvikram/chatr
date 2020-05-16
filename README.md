# Chatr

A chat application using NodeJS, ExpressJS, React, MongoDB and Websocket

## Getting Started

To start, run:

```
npm run webpack:dev
```

And in another terminal:

```
npm start --env NODE_ENV=development
```

### Start Mongo DB

```
docker run --rm --name mongo -v /tmp/mongo-data:/data/db -p 27017:27017 mongo
```

## Additionally, run Mongo client

```
docker run --rm -p 2700:3000 mongoclient/mongoclient
```
