import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);

  // counter
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <>
      <div className='outside'>
        <div className='orangebox'></div>
        <div className="preloader">
          {/* Tekst */}
          <p>Alex Emanuel</p>
          <p>
            GRAPHIC DESIGNER <br/>
            <span className='orangify'>✕</span> DEVELOPER <span className='orangify'>_</span>
          </p>

          {/* Counter */}
          <p className='counter'>
            {counter}<span className='dot orangify'>.</span>
          </p>

          {/* Loading bar */}
          <div className="loading-bar-container">
            <div
              className="loading-bar"
              style={{ width: `${counter}%` }}
            ></div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className='outside'>
      {/* <Navbar /> */}
      <div style={{ "background-color": "gray" }}><Outlet /></div>
      {/* <Footer /> */}
      <ScrollRestoration />
    </div>
  );
}

export default Layout;