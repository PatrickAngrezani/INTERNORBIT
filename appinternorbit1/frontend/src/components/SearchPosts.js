import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuthHeader } from "../services/postService";

function SearchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState("");

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

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setNewCommentContent(comment.content);
  };

  const handleUpdateComment = (commentId, postId) => {
    axios
      .put(
        `http://127.0.0.1:8000/posts/${postId}/comments/${commentId}/`,
        { content: newCommentContent },
        {
          headers: getAuthHeader(),
        }
      )
      .then((response) => {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, content: response.data.content }
                  : comment
              ),
            };
          }
          return post;
        });
        alert("Comment updated succesfully!");
        setPosts(updatedPosts);
        setEditingCommentId(null);
      })
      .catch((err) => {
        console.error("Error updating comment:", err);
      });
  };

  const handleDeleteComment = (commentId, postId) => {
    axios
      .delete(`http://127.0.0.1:8000/posts/${postId}/comments/${commentId}/`, {
        headers: getAuthHeader(),
      })
      .then(() => {
        const updatedPosts = posts.map((post) => ({
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
        }));
        alert("Comment deleted succesfully!");
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
      });
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      content: newComment,
    };

    axios
      .post(`http://127.0.0.1:8000/posts/${postId}/comments/`, commentData, {
        headers: getAuthHeader(),
      })
      .then((response) => {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return { ...post, comments: [...post.comments, response.data] };
          }
          return posts;
        });
        alert("Comment added succesfully!");
        setPosts(updatedPosts);
        setNewComment("");
      })
      .catch((err) => {
        console.error("Error adding comment:", err);
      });
  };

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

            <h4>Comments:</h4>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id}>
                  {editingCommentId === comment.id ? (
                    <div>
                      <input
                        type="text"
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                      />
                      <button
                        onClick={() => handleUpdateComment(comment.id, post.id)}
                      >
                        Save
                      </button>
                      <button onClick={() => setEditingCommentId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>{comment.content}</p>
                      <button onClick={() => handleEditClick(comment)}>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id, post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <h4>Add Comment:</h4>
            <form onSubmit={(e) => handleAddComment(e, post.id)}>
              <input
                type="text"
                placeholder="Enter comment"
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                required
              />
              <button type="submit">Add Comment</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPosts;
