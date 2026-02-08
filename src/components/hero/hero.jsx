import Button from '../button.jsx';
import './hero.css';
import { ArrowDownToLine } from 'lucide-react';

const Hero = () => {
    return (
        <div className='hero'>
            <div className='text-content'>
                <p>Hi, ik ben Alex Emanuel</p>
                <h1>
                GRAPHIC DESIGNER <br/>
                <span className='orangify'>✕</span> DEVELOPER <span className='orangify'>_</span>
                </h1>
                <Button naam="Leer mij kennen" href="#"/>
                <Button naam="Projecten" href="#"/>

                <div className='socials'>
                    <i class="fa-brands fa-linkedin"></i>
                    <i class="fa-brands fa-github"></i>
                    <ArrowDownToLine strokeWidth={3} className="social-arrow"/>
                </div>
            </div>
            <img src='/me.png'></img>
        </div>
    )
}

export default Hero;