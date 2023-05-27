import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onLogin(username, password);
    setLoginError(false);
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        {loginError && <p className="error-message">Invalid username or password.</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
