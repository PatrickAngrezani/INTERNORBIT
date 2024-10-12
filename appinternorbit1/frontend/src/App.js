import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [postTitle, setPostTitle] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (postTitle.trim()) {
      navigate(`/search-posts?title=${encodeURIComponent(postTitle)}`);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Blog!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/posts">List Posts</Link>
          </li>
          <li>
            <Link to="/create-post">Create Post</Link>
          </li>
        </ul>
      </nav>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter post Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <button type="submit">Search Post by Title</button>
      </form>
    </div>
  );
}

export default App;
