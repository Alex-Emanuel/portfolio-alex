import './body.css';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import projecten from '../../assets/data/projecten.js';

gsap.registerPlugin(ScrollTrigger);

const Projecten = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current.querySelectorAll("h4, h2, .projectgrid"),
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
    <div className='content-body projecten' ref={containerRef}>
      <h4>Eerst zien, dan geloven...</h4>
      <h2>Enkele projecten</h2>
      <div className='projectgrid'>
        {projecten.map((p) => (
          <div key={p.id} style={{
            backgroundImage: `url(${p.img})`,
            gridArea: p.grid,
          }}></div>
        ))}
      </div>
    </div>
  )
}

export default Projecten;
