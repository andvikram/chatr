import axios from 'axios';

function setDefaultHeadersForAxios() {
  axios.defaults.headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

export default setDefaultHeadersForAxios;
