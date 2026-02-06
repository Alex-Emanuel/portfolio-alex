import { Link } from 'react-router';
import './hero.css';

const Hero = () => {
    return (
        <div className='hero'>
            <p>Hello World</p>
            <Link to='/contact' className="text-blue-600 underline">Contact</Link>
            <img src='/me.png'></img>
            {/* <i className="fa-solid fa-image"></i> */}
        </div>
    )
}

export default Hero;