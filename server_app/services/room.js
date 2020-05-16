const Room = require(__basedir + '/server_app/models/room.js');
const Joinee = require(__basedir + '/server_app/models/joinee.js');

module.exports = {
  create: async function(params) {
    try {
      const room = await new Room({
        name: params.name
      }).save();

      return {
        status: 200,
        message: 'Successfully created room',
        object: room
      };
    } catch (error) {
      console.log("\nError saving room:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  fetch: async function(params) {
    try {
      const room = await Room.findById(params.id);

      return {
        status: 200,
        object: room
      };
    } catch (error) {
      console.log("\nError finding room by id:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  where: async function(params={}) {
    try {
      const rooms = await Room.find(params);

      return {
        status: 200,
        object: rooms
      };
    } catch (error) {
      console.log("\nError fetching rooms:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  join: async function(params) {
    try {
      const joinee = await new Joinee({
        roomID: params.room_id
      }).save();

      return {
        status: 200,
        message: 'Joined room!',
        object: joinee
      };
    } catch (error) {
      console.log("\nError saving joinee:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  updateJoinee: async function(joinee) {
    try {
      await joinee.save();

      return {
        status: 200,
        message: 'Joined room!',
        object: joinee
      };
    } catch (error) {
      console.log("\nError saving joinee:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  joinees: async function(params) {
    try {
      const joinees = await Joinee.find(params);

      return {
        status: 200,
        object: joinees
      };
    } catch (error) {
      console.log("\nError fetching joinees:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  }
};