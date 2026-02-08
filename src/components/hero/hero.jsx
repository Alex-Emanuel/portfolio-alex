import Button from '../button.jsx';
import './hero.css';
import { ArrowDownToLine } from 'lucide-react';
import { motion } from "framer-motion";


const Hero = () => {
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
                    <Button naam="Leer mij kennen" href="#"/>
                    <Button naam="Projecten" href="#"/>
                    </div>
                </motion.div>

                <div className='socials'>
                    <div>

                        <motion.a
                        href="https://www.linkedin.com/in/alex-emanuel/"
                        target="_blank" style={{ "padding-left": "2px"}}
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
        </div>
    )
}

export default Hero;