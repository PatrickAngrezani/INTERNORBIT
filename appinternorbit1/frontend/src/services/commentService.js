import axios from "axios";
import { getAuthHeader } from "./postService";

const BASE_API_POSTS_URL = "http://127.0.0.1:8000/posts/";

const updateComment = (postId, commentId, updatedContent) => {
  return axios.put(
    `${BASE_API_POSTS_URL}${postId}/comments/${commentId}/`,
    { content: updatedContent },
    { headers: getAuthHeader() }
  );
};

const deleteComment = (postId, commentId) => {
  return axios.delete(`${BASE_API_POSTS_URL}${postId}/comments/${commentId}/`, {
    headers: getAuthHeader(),
  });
};

const addComment = (postId, commentData) => {
  return axios.post(`${BASE_API_POSTS_URL}${postId}/comments/`, commentData, {
    headers: getAuthHeader(),
  });
};

export { updateComment, deleteComment, addComment };
