import axios from 'axios';
import setDefaultHeadersForAxios from '../utils/setDefaultHeadersForAxios';

class APIService {
  constructor() {
    setDefaultHeadersForAxios();
    this.baseAPIURL = 'http://localhost:4000/api/v1'
  }

  createUser(username) {
    const url = `users`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "POST",
      url: url,
      data: {
        name: username
      }
    });
  }

  getUsers() {
    const url = `users`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "GET",
      url: url
    });
  }

  createRoom(name) {
    const url = `rooms`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "POST",
      url: url,
      data: {
        name: name
      }
    });
  }

  getRooms() {
    const url = `rooms`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "GET",
      url: url
    });
  }

  joinRoom(roomID, userID) {
    const url = `rooms/join`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "POST",
      url: url,
      data: {
        room_id: roomID,
        user_id: userID
      }
    });
  }

  submitMessage(message, roomID, userID) {
    const url = `messages`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "POST",
      url: url,
      data: {
        message: message,
        room_id: roomID,
        user_id: userID
      }
    });
  }

  getMessagesInRoom(roomID) {
    const url = `rooms/${roomID}/messages`;
    return axios({
      baseURL: this.baseAPIURL,
      method: "GET",
      url: url
    });
  }
}

export default APIService;
