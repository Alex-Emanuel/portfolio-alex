import { Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

import './navbar.css';

const Navbar = () => {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false); 

  const navRef = useRef(null);
  const linksRef = useRef([]);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const phoneRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);

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

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 })
    gsap.set(linksRef.current, {
      autoAlpha: 0,
      x: -20,
    });
    gsap.set(phoneRef.current, {
      autoAlpha: 0,
      x: -20,
    })

    tl.current = gsap.timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(linksRef.current, {
        autoAlpha: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      }, "<+=0.2")
      .to(phoneRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "<+0.2");

    iconTl.current = gsap.timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(bottomLineRef.current, {
        rotate: -45,
        y: -3.3,
        duration: 0.3,
        ease: "power2.inOut",
      }, "<");
    }, []);

  const toggleMenu = () => {
    if(isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    }
    else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  }

  return (
    <>
    <p className="time">{time}</p>
    <div className="navbutton" onClick={toggleMenu}>
        <span class="menu-line" ref={topLineRef}></span>
        <span class="menu-line" ref={bottomLineRef}></span>
    </div>
    <nav ref={navRef}>
      {/* list items */}
      <div className='items'>
        {[
          { label: "over mij", href: "/" },
          { label: "contact", href: "/contact" },
        ].map((item, index) => (
          <div key={index} ref={(el) => (linksRef.current[index] = el)}>
            <Link to={item.href} className="li"
              onClick={() => {
                tl.current.reverse();
                iconTl.current.reverse();
                setIsOpen(false);
              }}>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      
      <a ref={phoneRef} href="tel:+32484022278">+32 484 02 22 78</a>
    </nav>
    </>
  );
};

export default Navbar;