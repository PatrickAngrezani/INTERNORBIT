import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Blog!</h1>
      <nav>
        <ul>
        <li><Link to="/login">Login</Link></li>
          <li><Link to="/posts">List Posts</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
