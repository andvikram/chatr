global.__basedir = __dirname;

const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;
const config = require(__basedir + '/server_app/config/config.js');

const express = require('express');
const app = express();
const server = require(__basedir + '/server_app/server.js')(app);
var cors = require('cors');

const corsOptions = {
  origin: false,
  allowedHeaders: '*',
  exposedHeaders: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// let whitelist =  ['http://localhost:4000', 'http://localhost:4100']
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   preflightContinue: true
// }
//
// app.options('*', cors(corsOptions));

app.use(express.static(__basedir + '/public'));

app.get('/',function(req,res) {
  res.sendFile(__basedir + '/public/app.html');
});

server.init(config);

server.start();
