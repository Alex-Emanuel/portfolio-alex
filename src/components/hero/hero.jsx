import Button from '../button.jsx';
import './hero.css';
import { ArrowDownToLine, ChevronsDown } from 'lucide-react';
import { motion } from "framer-motion";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
    const blobRef = useRef(null);
    const arrowsRef = useRef(null);
    const scrollTextRef = useRef(null);

    const scrollToMe = (e) => {
        e.preventDefault();

        const container = document.querySelector(".website-content");

        gsap.to(container, {
            scrollTo: { y: "#me", offsetY: 40 },
            duration: 1.3,
            ease: "power3.inOut",
        });
    };

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(blobRef.current, {
            y: 10,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
        })
        .from(
            scrollTextRef.current,
            { y: 10, opacity: 0, duration: 0.5 },
            "<0.2" // overlap 0.2 sec
        )
        .from(
            arrowsRef.current,
            { y: 10, opacity: 0, duration: 0.5 },
            "<0.2"
        )
        .to([scrollTextRef.current, arrowsRef.current], {
            y: -10,
            duration: 1.2,
            ease: "sine.inOut",
            repeat: -1,       // oneindig herhalen
            yoyo: true,       // heen en weer
        });
    }, []);

    return (
        <div className='hero'>
            <div className="text-content">
                <motion.div initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2
                }}>
                    <p>Hi, ik ben Alex Emanuel</p>
                    <h1>
                    GRAPHIC DESIGNER <br/>
                    <span className='orangify'>✕</span> DEVELOPER <span className='orangify'>_</span>
                    </h1>
                    <div className='buttons'>
                    <Button naam="Leer mij kennen" href="#me"/>
                    <Button naam="Projecten" href="#me"/>
                    </div>
                </motion.div>

                <div className='socials'>
                    <div>

                        <motion.a
                        href="https://www.linkedin.com/in/alex-emanuel/"
                        target="_blank" style={{ "paddingLeft": "2px"}}
                        whileHover={{ x: 3.5, y: -4, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        >
                        <i className="fa-brands fa-linkedin"></i>
                        </motion.a>

                        <motion.a
                        href="https://github.com/Alex-Emanuel"
                        target="_blank"
                        whileHover={{ x: 3.5, y: -4, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        >
                        <i className="fa-brands fa-github"></i>
                        </motion.a>

                        <motion.a
                        className="download"
                        href="/cv-alex-emanuel.pdf"
                        download
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        >
                        <motion.span
                            variants={{
                            rest: { y: 0, scale: 1 },
                            hover: { y: -5, scale: 1.1 }
                            }}
                            transition={{ type: "spring", stiffness: 400, duration: 0.25 }}
                        >
                            <ArrowDownToLine strokeWidth={3} className="social-arrow" />
                        </motion.span>
                        <span>CV</span>
                        </motion.a>
                    </div>
                </div>
            </div>
            <img src='/me.png'></img>
            
            <div className="scrollblob">
                <a href="#me" onClick={scrollToMe}>
                    <p ref={scrollTextRef}>scroll</p>
                    <ChevronsDown
                        ref={arrowsRef}
                        size={34}
                        strokeWidth={1}
                        className="arrows"
                    />
                </a>
                <svg
                    ref={blobRef}
                    className="blob"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 248.56 72.18"
                >
                    <g>
                    <path
                        className="cls-1"
                        d="M248.56,59.03v13.15H0v-13.15s.92.03,2.58,0c10.75-.19,52.3-2.85,72.08-32.29,1.15-1.7,2.39-3.28,3.7-4.78C89.19,8.57,105.73,0,124.28,0s35.1,8.57,45.92,21.95c1.31,1.5,2.55,3.08,3.7,4.78,19.78,29.44,61.33,32.11,72.08,32.29,1.66.03,2.58,0,2.58,0Z"
                    />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Hero;