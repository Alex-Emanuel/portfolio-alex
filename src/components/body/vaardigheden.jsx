import './body.css';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CIcon } from '@coreui/icons-react';
import * as icons from '@coreui/icons';
import vaardigheden from '../../assets/data/vaardigheden';


gsap.registerPlugin(ScrollTrigger);

const Vaardigheden = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animatie titels en sectie
    gsap.fromTo(
      containerRef.current.querySelectorAll("h4, h2, h3, section"),
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

    // Animatie skills chips
    const chips = containerRef.current.querySelectorAll(".vaardigheid-groep");
    gsap.fromTo(
      chips,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current.querySelector(".vaardigheden"),
          start: "top 100%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
          scroller: ".website-content",
        }
      }
    );
  }, []);

  return (
    <div className='content-body' ref={containerRef}>
      <h4>Waarmee ik u kan helpen</h4>
      <h2>Vaardigheden</h2>
      <section className="vaardigheden maxwidthcontent">
        {vaardigheden.map(cat => (
          <div key={cat.id} className="vaardigheid-groep">
            <h3>{cat.titel}</h3>
            <div className="vaardigheden-lijst">
              {cat.items.map(item => (
                <div key={item.id} className="vaardigheid-chip">
                  <CIcon icon={icons[item.icon]} className="skill-icon" />
                  <p>{item.naam}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Vaardigheden;