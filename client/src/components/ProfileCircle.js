import React, { useState } from 'react';
import './LinkContainer.css';

const emojiOptions = ['😀', '🥰', '😎']; // Define your emoji options

const ProfileCircle = () => {
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    // You can perform any additional actions here, such as saving the selected emoji in a database or updating the user's profile.
  };

  return (
    <div className="profile-circle">
      <div className="selected-emoji" style={{ fontSize: '10rem' }}>
        {selectedEmoji}
      </div>
      <div className="emoji-options">
        {emojiOptions.map((emoji, index) => (
          <span key={index} onClick={() => handleEmojiSelect(emoji)}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCircle;
