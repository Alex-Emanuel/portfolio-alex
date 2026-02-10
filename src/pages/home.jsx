import Hero from '../components/hero/hero.jsx';
import Me from '../components/body/me.jsx';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import Ervaring from '../components/body/ervaring.jsx';
import Vaardigheden from '../components/body/vaardigheden.jsx';
import Projecten from '../components/body/projecten.jsx';
import Contact from '../components/body/contact.jsx';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
};

const Home = () => {
  useEffect(() => {
      document.title = "Alex Emanuel | Design & Dev";
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
      <p className='footer'>space</p>
    </motion.main>
  )
}

export default Home;