import React, { useState } from 'react';
import './CreatePasswordPage.css';

const CreatePasswordPage = ({ onCreatePassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      onCreatePassword(username, password);
    }
  };

  return (
    <div className="create-password-container">
      <h1>Create Password</h1>
      <form className="create-password-form" onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        {passwordMatchError && <p className="error-message">Passwords do not match.</p>}
        <button type="submit">Create Password</button>
      </form>
    </div>
  );
};

export default CreatePasswordPage;
