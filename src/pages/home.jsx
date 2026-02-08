import Hero from '../components/hero/hero.jsx';
import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
};


const Home = () => {
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