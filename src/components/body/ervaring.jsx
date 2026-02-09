import './body.css';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Summation from '../summation';
import data from '../../assets/data/opleiding.json';

gsap.registerPlugin(ScrollTrigger);

const Ervaring = () => {
  const containerRef = useRef(null);

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
          <h4 id='me'>Studies × werk</h4>
          <h2>Ervaring</h2>
        </div>
        <div>
          <button>Opleiding</button>
          <button className='inactive'>Werkervaring</button>
        </div>
      </div>
      <div className='studie'>
        {data.map((studie, index) => (
          <Summation
            key={index}
            studie={studie}
          />
        ))}
      </div>
    </div>
  )
}

export default Ervaring;
