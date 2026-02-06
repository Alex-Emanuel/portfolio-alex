import { Link } from 'react-router';
import { useState, useEffect } from 'react';

import './navbar.css';

const Navbar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('nl-NL', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav>
      <p className="time">{time}</p>
      <div className="navbutton">
        <i className="fa-solid fa-bars"></i>
      </div>
    </nav>
  );
};

export default Navbar;