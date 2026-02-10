import '../index.css';
import { ArrowDownRight } from 'lucide-react';
import { motion } from "framer-motion";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

gsap.registerPlugin(ScrollToPlugin);

const Button = ({ naam, href }) => {
  const handleClick = (e) => {
    if (!href?.startsWith("#")) return;

    e.preventDefault();

    const container = document.querySelector(".website-content");
    const target = document.querySelector(href);
    if (!container || !target) return;

    const currentY = container.scrollTop;
    const targetY = target.offsetTop;
    const distance = Math.abs(targetY - currentY);

    gsap.to(container, {
      scrollTo: {
        y: targetY,
        offsetY: 40,
      },
      duration: gsap.utils.clamp(0.6, 2, distance / 800),
      ease: "sine.out",
    });
  };

  if (href.startsWith("/")) {
    return (
      <MotionLink to={href} className="link-button" whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300 }} >
        {naam}
        <span><ArrowDownRight size={27} /></span>
      </MotionLink>
    );
  }

  return (
    <motion.a href={href} onClick={handleClick} className="link-button" whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300 }} >
      {naam}
      <span><ArrowDownRight size={27} /></span>
    </motion.a>
  );
};

export default Button;