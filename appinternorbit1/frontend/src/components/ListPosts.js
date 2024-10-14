import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../services/postService";
import { useNavigate } from "react-router-dom";
import { deleteComment, updateComment } from "../services/commentService";

function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentContent, setNewCommentContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const handleUpdate = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  const handleDelete = (postId) => {
    deletePost(postId)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
        alert("Post deleted succesfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the post!");
      });
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setNewCommentContent(comment.content);
  };

  const handleUpdateComment = (commentId, postId) => {
    updateComment(postId, commentId, newCommentContent)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, content: newCommentContent }
                    : comment
                ),
              };
            }
            return post;
          })
        );
        setEditingCommentId(null);
        alert("Comment updated succesfully!");
      })
      .catch((error) => {
        console.error("There was and error updating the comment!", error);
      });
  };

  const handleDeleteComment = (commentId, postId) => {
    deleteComment(postId, commentId)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              };
            }
            return post;
          })
        );
        alert("Comment deleted succesfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the comment!", error);
      });
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>Title: {post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleUpdate(post.id)}>Update</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>

            <h4>Comments:</h4>
            {post.comments.length > 0 ? (
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
                          onClick={() =>
                            handleUpdateComment(comment.id, post.id)
                          }
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
                        <button onClick={() => handleEditComment(comment)}>
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteComment(comment.id, post.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPosts;
