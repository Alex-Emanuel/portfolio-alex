import Hero from '../components/hero/hero.jsx';
import { motion } from "framer-motion";
import { useEffect } from 'react';

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
    </motion.main>
  )
}

export default Home;