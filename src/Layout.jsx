import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { AnimatePresence } from "framer-motion";

import Navbar from './components/navbar/navbar.jsx'

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);

  const orangeBoxRef = useRef(null);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const buttonRef = useRef(null);
  const timeRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const logoRef = useRef(null);

  const location = useLocation();

  // pre loader animatie
  useGSAP(() => {
    if (!loading) return;

    document.body.style.overflow = 'hidden';

    gsap.set(buttonRef.current, {
      x: 50,
      y: -50,
    });
    gsap.set(logoRef.current, {autoAlpha: 0 })
    gsap.set('.website-content', { autoAlpha: 0 });
    gsap.set(bottomLineRef.current, { autoAlpha: 0 });
    gsap.set(topLineRef.current, { autoAlpha: 0 });
    gsap.set(timeRef.current, { x: 200 });
    gsap.set('.preloader', { autoAlpha: 1 });

    intervalRef.current = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);

          gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => { 
              setLoading(false);
              document.body.style.overflow = '';
            }
          })
          .to(orangeBoxRef.current, { height: '100%', duration: 0.65 })
          .to('.preloader', { autoAlpha: 0, duration: 0.1 })
          .to('.website-content', { autoAlpha: 1, duration: 0.1 })
          .to(orangeBoxRef.current, { height: 0, top: 0, bottom: 'auto', duration: 0.65 })
          .to(logoRef.current, { y: 0, autoAlpha: 1, duration: 0.1 }, '<+0.45')
          .to(buttonRef.current, { x: 0, y: 0, duration: 2 }, '<')
          .to(topLineRef.current, { autoAlpha: 1 }, '<+1.2')
          .to(bottomLineRef.current, { autoAlpha: 1 }, '<')
          .to(timeRef.current, { x: 0, duration: 2 }, '<-0.6');

          return 100;
        }
        return prev + 3;
      });
    }, 35);

    // cleanup
    return () => clearInterval(intervalRef.current);
  }, [loading], containerRef);

  return (
    <>
    <div className='frame' ref={containerRef}>
      <div className='website-content'>
        {/* <Navbar /> */}
        <Navbar logoRef={logoRef} 
                buttonRef={buttonRef} 
                timeRef={timeRef} 
                topLineRef={topLineRef} 
                bottomLineRef={bottomLineRef}/>

        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>

        {/* <Footer /> */}
        <ScrollRestoration />
      </div>
    </div>

    {/* Preloader / Orangebox overlay */}
    {loading && (
      <>
        <div className='outside' ref={containerRef}>
          <div ref={orangeBoxRef} className='orangebox'></div>
          <div className="preloader">
            <p>Alex Emanuel</p>
            <p>
              GRAPHIC DESIGNER <br/>
              <span className='orangify'>✕</span> DEVELOPER <span className='orangify'>_</span>
            </p>
            <p className='counter'>
              {counter}<span className='dot orangify'>.</span>
            </p>
            <div className="loading-bar-container">
              <div
                className="loading-bar"
                style={{ width: `${counter}%` }}
              ></div>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}

export default Layout;
