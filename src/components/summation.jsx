import '../index.css';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollToPlugin);

const Summation = ({ studie }) => {
  const { datum, opleiding, type, locatie, specialisatie, extra } = studie;

  return (
    <div className="summation">
      <div className="bolletje"></div>
      <p>{datum}</p>
      <p>{opleiding}</p>
      <p>{type}</p>
      <p>{locatie}</p>
      {specialisatie && <p>{specialisatie}</p>}
      {extra && <p className='extra'>{extra}</p>}
    </div>
  )
}

export default Summation;