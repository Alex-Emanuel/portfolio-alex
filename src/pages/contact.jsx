import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
};

const Contact = () => {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
    <div>
      <h1 className="text-4xl mb-4">Pagina niet gevonden</h1>
      <p>Er is geen pagina op deze url, probeer iets anders.</p>
    </div>
    </motion.main>
  );
};

export default Contact;
