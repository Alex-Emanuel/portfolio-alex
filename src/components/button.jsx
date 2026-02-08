import '../index.css';
import { Link } from 'react-router';
import { ArrowDownRight } from 'lucide-react';
import { motion } from "framer-motion";

const MotionLink = motion(Link);


const Button = ({ naam, href }) => {
  return (
    <MotionLink
      to={href}
      className="link-button"
      whileHover={{
        scale: 1.05,
        y: -2
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {naam}
      <span>
        <ArrowDownRight size={27} />
      </span>
    </MotionLink>
  );
};

// const Button = ({naam, href}) => {
//     return (
//         <Link to={href} className='link-button'>
//           {naam} <span><ArrowDownRight size={28}/></span>
//         </Link>
//     )
// }

export default Button;