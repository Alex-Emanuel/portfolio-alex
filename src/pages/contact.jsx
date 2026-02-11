import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Form from "../components/contact/form";
import '../components/contact/contact.css';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const Contact = () => {

  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const textRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    document.title = "Alex Emanuel | Contact";
  }, []);

  useGSAP(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(textRef.current, { opacity: 0, duration: 1 })
        .from(formRef.current, { opacity: 0, duration: 1 }, "<");
    }, []);

  return (
    <motion.main variants={pageVariants} initial="initial" animate="animate"
      exit="exit" transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className='contactbg'>
          <div className="textsocials">
            <motion.div style={{ opacity, y }} ref={textRef} className="contactdata">
              <div>
                <p>Heeft u vragen?</p>
                <h1>
                  Contacteer <br/>
                  <span className='orangify'>⫸</span> Mij nu
                </h1>
              </div>
              <div className='socialscontact'>
                  <motion.a href="mailto:alex.emanuel@telenet.be"
                    style={{paddingLeft: "1px"}}
                    whileHover={{ x: 1.5, y: -3 }}
                    transition={{ type: "ease", stiffness: 400 }}
                  >
                    <i className="fa-solid fa-square-envelope"></i>
                    alex.emanuel@telenet.be
                  </motion.a>
                  <motion.a href="tel:+32484022278"
                    style={{paddingLeft: "1px"}}
                    whileHover={{ x: 1.5, y: -3 }}
                    transition={{ type: "ease", stiffness: 400 }}
                  >
                    <i className="fa-solid fa-square-phone"></i>
                    +32 484 02 22 78
                  </motion.a>
                  <motion.a href="https://www.linkedin.com/in/alex-emanuel/"
                    style={{paddingLeft: "1px"}}
                    whileHover={{ x: 1.5, y: -3 }}
                    transition={{ type: "ease", stiffness: 400 }}
                  >
                    <i className="fa-brands fa-linkedin"></i>
                    @alex-emanuel
                  </motion.a>
                  {/* <motion.a href="https://github.com/Alex-Emanuel"
                    whileHover={{ x: 1.5, y: -3 }}
                    transition={{ type: "ease", stiffness: 400 }}
                  >
                    <i className="fa-brands fa-github"></i>
                    @Alex-Emanuel
                  </motion.a> */}
              </div>
            </motion.div>
            <motion.div ref={formRef} style={{ opacity, y }} className="form">
              <Form/>
            </motion.div>
          </div>
      </div>
    </motion.main>
  );
};

export default Contact;
