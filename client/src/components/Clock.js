import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <span className="clock__time">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default Clock;
