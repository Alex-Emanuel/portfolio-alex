import { motion } from "framer-motion";
import '../index.css';

const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
};

const NotFound = () => {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
    <div className="notfound">
      <h1>Pagina niet gevonden</h1>
      <p>Er is geen pagina op deze url.</p>
    </div>
    </motion.main>
  );
};

export default NotFound;
