import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../services/postService";
import { useNavigate } from "react-router-dom";

function ListPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const handleUpdate = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  const handleDelete = (postId) => {
    deletePost(postId)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
        alert("Post deleted succesfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the post!");
      });
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>Title: {post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleUpdate(post.id)}>Update</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPosts;
