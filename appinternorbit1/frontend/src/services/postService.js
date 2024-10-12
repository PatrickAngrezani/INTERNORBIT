import axios from "axios";

const BASE_API_POSTS_URL = "http://127.0.0.1:8000/posts/";

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getPosts = () => {
  return axios.get(`${BASE_API_POSTS_URL}`);
};

const createPost = (postData) => {
  const createPostURL = `${BASE_API_POSTS_URL}create/`;

  return axios.post(createPostURL, postData, { headers: getAuthHeader() });
};

const updatePost = (id, updatedData) => {
  const updatePostURL = `${BASE_API_POSTS_URL}${id}/update/`;

  return axios.put(updatePostURL, updatedData, { headers: getAuthHeader() });
};

const getPostById = (id) => {
  return axios.get(`${BASE_API_POSTS_URL}${id}`);
};

const deletePost = (id) => {
  const deletePostURL = `${BASE_API_POSTS_URL}delete/${id}/`;

  return axios.delete(deletePostURL, { headers: getAuthHeader() });
};

export {
  getPosts,
  createPost,
  getAuthHeader,
  updatePost,
  getPostById,
  deletePost,
};
