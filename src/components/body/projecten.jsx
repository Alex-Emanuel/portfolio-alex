import './body.css';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "framer-motion";

import projecten from '../../assets/data/projecten.js';

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = () => {
  const hasTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  const smallScreen = window.innerWidth <= 1024;

  return hasTouch && smallScreen;
};

const ProjectItem = ({ p, index, activeItem, setActiveItem, touch }) => {
  const itemRef = useRef(null);
  const [hover, setHover] = useState(false);

  const overlayVariants = {
    rest: { scaleY: 0 },
    hover: { scaleY: 1 },
  };

  const active = touch ? activeItem === index : hover;

  const handleClick = () => {
    if (!touch) return;

    setActiveItem(active ? null : index);
  };

  const handleClose = (e) => {
    e.stopPropagation(); // voorkomt toggle van overlay
    setActiveItem(null);
  };

  return (
    <motion.div
      ref={itemRef}
      className="project-item"
      animate={active ? "hover" : "rest"}
      onHoverStart={!touch ? () => setHover(true) : undefined}
      onHoverEnd={!touch ? () => setHover(false) : undefined}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${p.img})`,
        gridArea: p.grid,
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Altijd zichtbare titel bovenop afbeelding (voor mobiel/tablet) */}
      {touch && (
        <div className="project-title-overlay">
          <p>{p.titel}</p>
        </div>
      )}

      {/* Donkere overlay bij actieve project */}
      <motion.div
        className={`project-overlay ${active ? "active" : ""}`}
        variants={overlayVariants}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Sluitknop voor touch devices */}
        {touch && active && (
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        )}

        <p>{p.titel}</p>
        <p>{p.uitleg}</p>

        {p.team && p.team.length > 0 && (
          <p className='team'>
            Team:{" "}
            {p.team.map((lid, i) => (
              <span key={i}>
                <a rel="noopener noreferrer" href={lid.linkedin} target="_blank"
                  onClick={(e) => e.stopPropagation()}>
                  {lid.naam}
                </a>
                {i < p.team.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}

        <p className='talen'>{p.talen}</p>

        <a
          href={p.link}
          target="_blank"
          className='direct'
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
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


// const ProjectItem = ({ p, index, activeItem, setActiveItem, touch }) => {
//   const itemRef = useRef(null);
//   const [hover, setHover] = useState(false);

//   const overlayVariants = {
//     rest: { scaleY: 0 },
//     hover: { scaleY: 1 },
//   };

//   const active = touch ? activeItem === index : hover;

//   const handleClick = () => {
//     if (!touch) return;

//     // Altijd maar één actief
//     setActiveItem(active ? null : index);
//   };

//   return (
//     <motion.div
//       ref={itemRef}
//       className="project-item"
//       animate={active ? "hover" : "rest"}
//       onHoverStart={!touch ? () => setHover(true) : undefined}
//       onHoverEnd={!touch ? () => setHover(false) : undefined}
//       onClick={handleClick}
//       style={{
//         backgroundImage: `url(${p.img})`,
//         gridArea: p.grid,
//       }}
//     >
//       <motion.div
//         className="project-overlay"
//         variants={overlayVariants}
//         transition={{ duration: 0.25, ease: "easeOut" }}
//       >
//         <p>{p.titel}</p>
//         <p>{p.uitleg}</p>

//         {p.team && p.team.length > 0 && (
//           <p className='team'>
//             Team:{" "}
//             {p.team.map((lid, i) => (
//               <span key={i}>
//                 <a rel="noopener noreferrer" href={lid.linkedin} target="_blank"
//                   onClick={(e) => e.stopPropagation()}>
//                   {lid.naam}
//                 </a>
//                 {i < p.team.length - 1 ? ", " : ""}
//               </span>
//             ))}
//           </p>
//         )}

//         <p className='talen'>{p.talen}</p>

//         <a
//           href={p.link}
//           target="_blank"
//           className='direct'
//           rel="noopener noreferrer"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {p.type === "dev" ? (
//             <i className="fa-brands fa-github"></i>
//           ) : (
//             <i className="fa-solid fa-globe"></i>
//           )}
//           Bekijk de {p.type === "dev" ? "code" : "website"}
//         </a>
//       </motion.div>
//     </motion.div>
//   );
// };

const Projecten = () => {  
  const containerRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const touch = isTouchDevice(); 

  useGSAP(() => {
    const onResize = () => {};
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll("h4, h2, .projectgrid"),
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, 
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
          <ProjectItem key={p.id} p={p} index={index} activeItem={activeItem}
            setActiveItem={setActiveItem} touch={touch}/>
        ))}
      </div>
    </div>
  )
}


export default Projecten;
