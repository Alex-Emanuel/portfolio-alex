import './body.css';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { motion } from "framer-motion";
import Button from '../button';

const Contact = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current.querySelectorAll("h4, h2, p, .contactref, a"),
      { opacity: 0, y: 50 },
      { 
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
          scroller: ".website-content",
        }
      }
    );
  }, []);

  return (
    <div className='content-body ervaring contactref' ref={containerRef}>
      <div className='maxwidthcontent'>
        <p>Zin om samen te werken<span className='orangify'>?</span></p>
        <p><span className='orangify'>⫸</span> Contacteer mij</p>
        <Button naam="Contact" href="#me" />
      </div>
    </div>
  )
}

export default Contact;