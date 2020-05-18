const messageService = require(__basedir + '/server_app/services/message.js');

module.exports = {
  create: function(req, res) {
    messageService.create({
      text: req.body.message,
      userID: req.body.user_id,
      roomID: req.body.room_id
    }).then(result => res.status(result.status).json(result));
  },

  fetch: function(req, res) {
    messageService.fetch({
      id: req.params.id
    }).then(result => res.status(result.status).json(result));
  }
};
