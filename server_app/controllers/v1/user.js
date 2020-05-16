const userService = require(__basedir + '/server_app/services/user.js');

module.exports = {
  create: function(req, res) {
    userService.where({
      name: req.body.name
    })
    .then(whereResult => {
      if (whereResult.object && whereResult.object.length > 0) {
        res.status(202).json({
          status: 202,
          message: 'User already exists!',
          object: whereResult.object[0]
        });
      } else {
        userService.create({
          name: req.body.name
        })
        .then(result => res.status(result.status).json(result));
      }
    });
  },

  fetch: function(req, res) {
    userService.fetch({
      id: req.params.id
    })
    .then(result => res.status(result.status).json(result));
  },

  fetchAll: function(req, res) {
    userService.where({})
    .then(result => res.status(result.status).json(result));
  }
};