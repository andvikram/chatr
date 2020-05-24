# Chatr

A demo chat application using NodeJS, ExpressJS, ReactJS, MongoDB and Websocket

## Getting Started

To start in development mode, run the following commands in separate terminals:

```
docker run --rm --name mongo -v /tmp:/data/db -p 27017:27017 mongo
```

```
npm run webpack:dev
```

```
npm start
```

### Additionally, run Mongo client

```
docker run --rm -p 2700:3000 mongoclient/mongoclient
```
