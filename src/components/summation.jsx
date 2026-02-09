import '../index.css';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollToPlugin);

const Summation = ({ onderdeel }) => {
  const { datum, titel, subtitel, uitleg, specialisatie, extra } = onderdeel;

  return (
    <div className="summation">
      <div className="bolletje"></div>
      <p>{datum}</p>
      <p>{titel}</p>
      <p>{subtitel}</p>
      <p>{uitleg}</p>
      {specialisatie && <p>{specialisatie}</p>}
      {extra && <p className='extra'>{extra}</p>}
    </div>
  )
}

export default Summation;