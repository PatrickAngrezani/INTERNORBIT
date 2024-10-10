import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/posts/';

const getPosts = () => {
  return axios.get(API_URL);
};

export default getPosts;
