import './body.css';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Me = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !imgRef.current) return;

    gsap.fromTo(containerRef.current.querySelectorAll("h4, h2, p"),
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

    gsap.fromTo(imgRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 95%",
          end: "top 50%",
          scrub: true,
          scroller: ".website-content",
        }
      }
    );

  }, []);

  function berekenLeeftijd(geboortedatum) {
    const vandaag = new Date();
    const geboorte = new Date(geboortedatum);
    let leeftijd = vandaag.getFullYear() - geboorte.getFullYear();
    const maandVerschil = vandaag.getMonth() - geboorte.getMonth();
    const dagVerschil = vandaag.getDate() - geboorte.getDate();

    if (maandVerschil < 0 || (maandVerschil === 0 && dagVerschil < 0)) {
      leeftijd--;
    }
    return leeftijd;
  }

  const dogage = berekenLeeftijd("2022-09-03");

  return (
    <div className='content-body' ref={containerRef}>
      <h4 id='me'>Wie ben ik</h4>
      <h2>Even kennismaken</h2>
      <div className='maxwidthcontent me'>
        <p>
          Ik ben een leergierige laatstejaarsstudent <b>Toegepaste Informatica</b> aan HOGENT, 
          met een achtergrond in <b>Grafische en Digitale Media</b>. Ik heb een passie voor design, 
          coderen en programmeren en wil van deze combinatie mijn beroep maken. 
          Altijd op zoek naar groei combineer ik creativiteit met oog voor detail om innovatieve, 
          gebruiksvriendelijke oplossingen te creëren.
        </p>
        <p>
          In mijn vrije tijd ben ik op vrijwillige basis <b>instructeur</b> bij hondenschool Action4Dogs, 
          waar ik lesgeef aan baasjes en hun trouwe viervoeters. Als enthousiaste <b>hondenliefhebber</b> train en ga ik ook zelf regelmatig op pad met mijn {dogage} jaar oude Australische herder Vinny.
        </p>
        <img ref={imgRef} src='./beach.jpg' alt="Alex wandelt met haar hond Vinny op het strand"/>
      </div>
    </div>
  )
}

export default Me;
