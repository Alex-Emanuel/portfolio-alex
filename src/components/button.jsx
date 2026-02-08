import '../index.css';
import { Link } from 'react-router';
import { ArrowDownRight } from 'lucide-react';

const Button = ({naam, href}) => {
    return (
        <Link to={href} className='link-button'>
          {naam} <span><ArrowDownRight size={28}/></span>
        </Link>
    )
}

export default Button;