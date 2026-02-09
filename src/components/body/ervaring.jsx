import './body.css';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Summation from '../summation';
import { motion } from "framer-motion";

import opleiding from '../../assets/data/opleiding.js';
import werkervaring from '../../assets/data/ervaring.js';

import { useOutletContext } from 'react-router-dom';

const Ervaring = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('opleiding');
  const [renderedTab, setRenderedTab] = useState('opleiding');
  const fadeOutAnimRef = useRef(null);
  const { lenisRef } = useOutletContext();

  const switchTab = (tab) => {
    if (tab === activeTab) return;

    const buttons = document.querySelectorAll('.title-buttons button');
    buttons.forEach((btn) => {
      if (btn.textContent.toLowerCase().includes(tab)) {
        btn.classList.remove('inactive');
      } else {
        btn.classList.add('inactive');
      }
    });

    if (!itemsRef.current) {
      setActiveTab(tab);
      setRenderedTab(tab);
      if (lenisRef.current) lenisRef.current?.resize();; // update Lenis meteen
      return;
    }

    // Oude items fade-out
    fadeOutAnimRef.current = gsap.to(itemsRef.current.children, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        setActiveTab(tab);
        setRenderedTab(tab);

        // ⚡ Update Lenis na DOM update
        setTimeout(() => {
          if (lenisRef.current) lenisRef.current?.resize();;
        }, 50); // kleine delay zodat de nieuwe items volledig in DOM staan
      }
    });
  };

  // Nieuwe items
  useGSAP(() => {
    if (!itemsRef.current) return;

    const newItems = Array.from(itemsRef.current.children);
    gsap.fromTo(newItems,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [renderedTab]);

  // Fade in scroll
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current.querySelectorAll("h4, h2, p, button"),
      { opacity: 0, y: 50 },
      { 
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
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
    <div className='content-body ervaring' ref={containerRef}>
      <div className='title-buttons'>
        <div>
          <h4>Studies × werk</h4>
          <h2>Ervaring</h2>
        </div>
        <div>
          <motion.button
            className={activeTab === 'opleiding' ? '' : 'inactive'}
            onClick={() => switchTab('opleiding')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Opleiding
          </motion.button>
          <motion.button
            className={activeTab === 'werkervaring' ? '' : 'inactive'}
            onClick={() => switchTab('werkervaring')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Werkervaring
          </motion.button>
        </div>
      </div>

      <div className='studie' ref={itemsRef}>
        {renderedTab === 'opleiding' &&
          opleiding.map((item) => (
            <Summation key={item.id} onderdeel={item} />
          ))
        }
        {renderedTab === 'werkervaring' &&
          werkervaring.map((item) => (
            <Summation key={item.id} onderdeel={item} />
          ))
        }
      </div>
    </div>
  )
}

export default Ervaring;
