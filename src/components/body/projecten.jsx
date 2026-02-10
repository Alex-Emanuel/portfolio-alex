import './body.css';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "framer-motion";

import projecten from '../../assets/data/projecten.js';

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = () => window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const ProjectItem = ({ p, index, activeRow, setActiveRow, touch, columns }) => {
  const itemRef = useRef(null);
  const [hover, setHover] = useState(false);

  const overlayVariants = {
    rest: { scaleY: 0 },
    hover: { scaleY: 1 },
  };

  const rowIndex = touch && columns ? Math.floor(index / columns) : null;

  // Touchscreen ScrollTrigger
  useGSAP(() => {
    if (!touch || !itemRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: itemRef.current,
      scroller: ".website-content",
      start: "top 65%",
      end: "bottom 35%",
      onEnter: () => setActiveRow(rowIndex),
      onEnterBack: () => setActiveRow(rowIndex),
    });

    return () => trigger.kill();
  }, [touch, rowIndex]);

  const active = touch
    ? activeRow === rowIndex
    : hover;

  return (
    <motion.div ref={itemRef} className="project-item" animate={active ? "hover" : "rest"}
      onHoverStart={!touch ? () => setHover(true) : undefined} onHoverEnd={!touch ? () => setHover(false) : undefined}
      style={{
        backgroundImage: `url(${p.img})`,
        gridArea: p.grid,
      }}
    >
      <motion.div className="project-overlay" variants={overlayVariants} transition={{ duration: 0.25, ease: "easeOut" }}>
        <p>{p.titel}</p>
        <p>{p.uitleg}</p>
        {p.team && p.team.length > 0 && (
          <p className='team'>
            Team:{" "}
            {p.team.map((lid, i) => (
              <span key={i}>
                <a rel="noopener noreferrer" href={lid.linkedin}>{lid.naam}</a>
                {i < p.team.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
        <p className='talen'>{p.talen}</p>
        <a href={p.link} target="_blank" className='direct' rel="noopener noreferrer">
          {p.type === "dev" ? (
            <i className="fa-brands fa-github"></i>
          ) : (
            <i className="fa-solid fa-globe"></i>
          )}
          Bekijk de {p.type === "dev" ? "code" : "website"}
        </a>
      </motion.div>
    </motion.div>
  );
};

const Projecten = () => {  
  const getColumns = () => {
    if (!isTouchDevice()) return null;
    if (window.innerWidth >= 668) return 2;
    return 1;
  };

  const containerRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [columns, setColumns] = useState(getColumns());
  const touch = isTouchDevice(); 

  // animaties + scrolltriggers
  useGSAP(() => {
    const onResize = () => setColumns(getColumns());
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    // Animatie headings + projectgrid
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll("h4, h2, .projectgrid"),
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
    }

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className='content-body projecten' ref={containerRef}>
      <h4 id="projecten">Eerst zien, dan geloven...</h4>
      <h2>Enkele projecten</h2>
      <div className="projectgrid">
        {projecten.map((p, index) => (
          <ProjectItem key={p.id} p={p}
            index={index} activeRow={activeRow} setActiveRow={setActiveRow}
            touch={touch} columns={columns} />
        ))}
      </div>
    </div>
  )
}

export default Projecten;
