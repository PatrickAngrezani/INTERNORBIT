import React, { useState } from "react";
import { createPost } from "./../services/postService";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      content: content,
    };
    console.log(postData);

    createPost(postData)
      .then((response) => {
        console.log("Post created succesfully", response);
        alert("Post created succesfully");
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post!");
      });
  };

  return (
    <div className="create-post">
      <h1>Create new Post</h1>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
