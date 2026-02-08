import '../index.css';
import { ArrowDownRight } from 'lucide-react';
import { motion } from "framer-motion";

const Button = ({ naam, href }) => {
  return (
    <motion.a
      href={href}
      className="link-button"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {naam}
      <span><ArrowDownRight size={27} /></span>
    </motion.a>
  );
};

export default Button;