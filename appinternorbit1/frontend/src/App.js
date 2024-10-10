import React, { useEffect, useState } from 'react';
import getPosts from './services/postService';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(response => {
      setPosts(response.data);
    }).catch(error => {
      console.error("There was an error fetching the posts!", error);
    });
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
