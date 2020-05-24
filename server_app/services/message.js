const axios = require('axios');
const Message = require(__basedir + '/server_app/models/message.js');

module.exports = {
  create: async function(params) {
    const message = new Message({
      text: params.text,
      author: params.userID,
      topic: params.roomID
    })
    try {
      await message.save().then(message => message.populate('author').execPopulate());

      publish(message);

      return {
        status: 200,
        message: 'Success',
        object: message
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
      const message = await Message.findById(params.id).populate('author');

      return {
        status: 200,
        message: 'Success',
        object: message
      };
    } catch (error) {
      console.log("\nError finding message by id:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  },

  fetchByRoom: async function(params) {
    try {
      const messages = await Message.find({ topic: params.roomID }).populate('author');

      return {
        status: 200,
        message: 'Success',
        object: messages
      };
    } catch (error) {
      console.log("\nError finding messages in room:", error);
      return {
        status: 500,
        message: 'Internal Server Error'
      };
    }
  }
};

function publish(message) {
  try {
    axios({
      baseURL: "http://localhost:4100",
      method: "POST",
      url: `/topics/${message.topic}/messages/new`,
      data: {
        message: JSON.stringify(message)
      }
    })
    .catch(error => console.log(error))
    .then(response => console.log("publishMessage:", response.data));
  } catch (error) {
    console.log("\nError requesting GoReal:", error);
  }
}
