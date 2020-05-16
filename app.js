global.__basedir = __dirname;

const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;
const config = require(__basedir + '/server_app/config/config.js');

const express = require('express');
const app = express();
const server = require(__basedir + '/server_app/server.js')(app);

app.use(express.static(__basedir + '/public'));

app.get('/',function(req,res) {
  res.sendFile(__basedir + '/public/app.html');
});

server.init(config);

server.start();
