const roomService = require(__basedir + '/server_app/services/room.js');
const userService = require(__basedir + '/server_app/services/user.js');
const _array = require('lodash/array');

const roomController = {
  create: function(req, res) {
    roomService.where({
      name: req.body.name
    })
    .then(whereResult => {
      if (whereResult.object && whereResult.object.length > 0) {
        res.status(202).json({
          status: 202,
          message: 'Room already exists!',
          object: whereResult.object[0]
        });
      } else {
        roomService.create({
          name: req.body.name
        })
        .then(result => res.status(result.status).json(result));
      }
    });
  },

  fetch: function(req, res) {
    const response = roomService.fetch({
      id: req.params.id
    });

    return res.status(response.status).json(response.data);
  },

  fetchAll: function(req, res) {
    roomService.where({})
    .then(result => res.status(result.status).json(result));
  },

  join: function(req, res) {
    roomService.joinees({
      roomID: req.body.room_id
    })
    .then(result => {
      if (result.object && result.object.length > 0) {
        let joinee = result.object[0];
        joinee.userIDs = _array.uniq(joinee.userIDs.push(req.body.user_id));
        roomService.updateJoinee(joinee)
        .then(result => {
          joinee = result.object;
          joinRoom(joinee, res);
        });
      } else {
        roomService.join({
          user_ids: [req.body.user_id],
          room_id: req.body.room_id
        })
        .then(result => {
          let joinee = result.object;
          joinRoom(joinee, res);
        });
      }
    });
  }
};

function joinRoom(joinee, res) {
  let userIDs = joinee.userIDs.map(id => mongoose.Types.ObjectId(id));
  userService.where({ '_id': { $in: userIDs } })
  .then(result => {
    if (result.status == 200) {
      let users = result.object;
      roomService.fetch({ id: joinee.roomID })
      .then(result => {
        let room = result.object;
        res.status(result.status).json({
          status: result.status,
          message: `Joined room ${room.name}!`,
          object: {
            room: room,
            users: users
          }
        });
      });
    } else {
      res.status(result.status).json(result);
    }
  });
}

module.exports = roomController;