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
                <div className='buttons'>
                <Button naam="Leer mij kennen" href="#"/>
                <Button naam="Projecten" href="#"/>
                </div>

                <div className='socials'>
                    <div>
                        <a target='blank' href="https://www.linkedin.com/in/alex-emanuel/"><i class="fa-brands fa-linkedin"></i></a>
                        <a target='blank' href="https://github.com/Alex-Emanuel"><i class="fa-brands fa-github"></i></a>
                        <a className='download' href="/cv-alex-emanuel.pdf" download><ArrowDownToLine strokeWidth={3} className="social-arrow"/> <span>CV</span></a>
                    </div>
                    {/* <div>
                        <p>@alex-emanuel</p>
                        <p>@Alex-Emanuel</p>
                    </div> */}
                </div>
            </div>
            <img src='/me.png'></img>
        </div>
    )
}

export default Hero;