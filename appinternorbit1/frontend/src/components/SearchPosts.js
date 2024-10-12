import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get("title");

    if (title) {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/posts/?title=${encodeURIComponent(title)}`)
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Error fetching posts by title:");
          setLoading(false);
        });
    }
  }, [location.search]);
  return (
    <div className="search-posts">
      <h1>Search Posts by Title</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPosts;
