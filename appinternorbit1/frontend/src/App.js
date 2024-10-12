import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [postTitle, setPostTitle] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (postTitle.trim()) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/posts/?title=${encodeURIComponent(postTitle)}`
        );

        if (response.data.length > 0) {
          setSearchResult(response.data);
          navigate(`/search-posts?title=${encodeURIComponent(postTitle)}`);
        } else {
          alert("No post found with the given title.");
        }
      } catch (error) {
        console.error("Error searching for post:", error);
        alert("Error searching for post");
      }
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
