import React, { useState } from "react";
import login from "./../services/authService";

function Login({ setAuthToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { username: username, password: password };

    login(credentials)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.access;
          console.log({ token });

          setAuthToken(token);
          localStorage.setItem("authToken", token);
        }
      })
      .catch((error) => {
        console.error("Error logging:", error);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
