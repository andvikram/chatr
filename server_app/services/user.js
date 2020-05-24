const axios = require('axios');
const User = require(__basedir + '/server_app/models/user.js');

const userService = {
  create: async function(params) {
    try {
      const user = await new User({
        name: params.name
      }).save();

      return {
        status: 200,
        message: 'Successfully created user',
        object: user
      };
    } catch (error) {
      console.log("\nError saving user:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  fetch: async function(params) {
    try {
      const user = await User.findById(params.id);

      return {
        status: 200,
        object: user
      };
    } catch (error) {
      console.log("\nError finding user by id:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  where: async function(params={}) {
    try {
      const users = await User.find(params);

      return {
        status: 200,
        message: 'Success',
        object: users
      };
    } catch (error) {
      console.log("\nError finding user by id:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  }
};

module.exports = userService;
