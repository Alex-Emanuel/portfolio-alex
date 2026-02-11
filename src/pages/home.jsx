import Hero from '../components/hero/hero.jsx';
import Me from '../components/body/me.jsx';
import { motion } from "framer-motion";
import { useEffect, useRef } from 'react';
import Ervaring from '../components/body/ervaring.jsx';
import Vaardigheden from '../components/body/vaardigheden.jsx';
import Projecten from '../components/body/projecten.jsx';
import Contact from '../components/body/contact.jsx';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useOutletContext } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
};

const Home = () => {
  const containerRef = useRef(null);
  const { lenisRef } = useOutletContext();

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 115%",
          end: "top 90%",
          scrub: true,
          scroller: ".website-content",
        },
      }
    );
  }, []);


  useEffect(() => {
    document.title = "Alex Emanuel | Design & Dev";

    if (lenisRef?.current) {
      setTimeout(() => {
        lenisRef.current.resize();
      }, 50);
    }
  }, []);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Hero />
      <Me />
      <Ervaring />
      <Vaardigheden />
      <Projecten />
      <Contact />
      <footer ref={containerRef}>
        <p>©2026 Alex Emanuel - Alle rechten voorbehouden</p>
        <div>
          <a href="tel:+32484022278">+32 484 02 22 78</a>
          <a href="https://www.linkedin.com/in/alex-emanuel/" target="_blank">
              <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/Alex-Emanuel" target="_blank">
              <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </footer>
    </motion.main>
  )
}

export default Home;