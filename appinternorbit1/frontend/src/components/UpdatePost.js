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

    const updatedData = {};
    if (title.trim()) {
      updatedData.title = title;
    }
    if (content.trim()) {
      updatedData.content = content;
    }

    if (Object.keys(updatedData).length === 0)
      return alert("Please update at least one field");

    updatePost(postId, updatedData)
      .then((response) => {
        console.log("Post updated succesfully!", response);
        alert("Post updated sucessfully!");
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        alert("Error updating Post");
        setTitle("");
        setContent("");
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
            placeholder="leave empty if no change"
          />
        </div>
        <div>
          <label>Content:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="leave empty if no change"
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default UpdatePost;
