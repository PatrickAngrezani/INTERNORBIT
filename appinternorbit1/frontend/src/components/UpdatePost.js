import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getPostById, updatePost } from "../services/postService";

function UpdatePost() {
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getPostById(postId)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.setContent);
      })
      .catch((error) => {
        console.error("Error searching post:", error);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      title: title,
      content: content,
    };

    updatePost(postId, updatedData)
      .then((response) => {
        console.log("Post updated succesfully!", response);
        alert("Post updated sucessfully!");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        alert("Error updating Post");
      });
  };

  return (
    <div className="update-post">
      <h1>update Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Post Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default UpdatePost;
