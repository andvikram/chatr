const Message = require(__basedir + '/server_app/models/message.js');

module.exports = {
  create: async function(params) {
    const message = new Message({
      name: params.name
    })
    try {
      const newMessage = await message.save();

      return {
        status: 200,
        message: 'Success',
        data: newMessage
      };
    } catch (error) {
      console.log("\nError saving message:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  fetch: async function(params) {
    try {
      const message = await Message.findById(params.id);

      return {
        status: 200,
        message: 'Success',
        data: message
      };
    } catch (error) {
      console.log("\nError finding message by id:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  }
};