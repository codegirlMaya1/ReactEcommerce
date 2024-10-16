import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user credentials in local storage
    localStorage.setItem('user', JSON.stringify({ ...credentials, name: credentials.username, email: '', phone: '', address: '', profilePicture: '' }));
    setLoggedIn(true);
  };

  return (
    <div>
      <h2>Login</h2>
      {loggedIn ? (
        <div>
          <p>Login successfully! <a href="/home">Return to Home</a></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" required />
          <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      )}
      <a href="/home">Continue as Guest</a>
    </div>
  );
};

export default Login;
