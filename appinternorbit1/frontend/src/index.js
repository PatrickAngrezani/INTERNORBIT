import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import ListPosts from "./components/ListPosts";
import UpdatePost from "./components/UpdatePost";
import SearchPosts from "./components/SearchPosts";

const root = ReactDOM.createRoot(document.getElementById("root"));

function MainApp() {
  const [authToken, setAuthToken] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/posts" element={<ListPosts />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route path="/search-posts" element={<SearchPosts />} />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

reportWebVitals();
