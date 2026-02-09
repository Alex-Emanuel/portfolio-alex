import '../index.css';
import { ArrowDownRight } from 'lucide-react';
import { motion } from "framer-motion";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollToPlugin);

const Button = ({ naam, href }) => {
  const handleClick = (e) => {
    if (!href?.startsWith("#")) return;

    e.preventDefault();

    const container = document.querySelector(".website-content");
    if (!container) return;

    gsap.to(container, {
      scrollTo: {
        y: href,
        offsetY: 40,
      },
      duration: 1.3,
      ease: "power3.inOut",
    });
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
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