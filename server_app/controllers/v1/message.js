const messageService = require(__basedir + '/server_app/services/message.js');

module.exports = {
  create: function(req, res) {
    const response = messageService.create({
      text: req.params.text
    });

    return res.status(response.status).json(response.data);
  },

  fetch: function(req, res) {
    const response = messageService.fetch({
      id: req.params.id
    });

    return res.status(response.status).json(response.data);
  }
};