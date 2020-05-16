const express = require('express');
const userController = require(__basedir + '/server_app/controllers/v1/user.js');
const roomController = require(__basedir + '/server_app/controllers/v1/room.js');
const messageController = require(__basedir + '/server_app/controllers/v1/message.js');

const router = express.Router();

router.post('/v1/users', userController.create);
router.get('/v1/users', userController.fetchAll);
router.get('/v1/users/:id', userController.fetch);

router.post('/v1/rooms',roomController.create);
router.get('/v1/rooms', roomController.fetchAll);
router.get('/v1/rooms/:id', roomController.fetch);
router.post('/v1/rooms/join', roomController.join);

router.post('/v1/messages', messageController.create);
router.get('/v1/messages/:id', messageController.fetch);

module.exports = router;