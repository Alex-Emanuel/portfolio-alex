import { useEffect, useRef } from "react";
import '../index.css';

const ScrollIndicator = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector(".website-content");

    if (!container) return;

    const updateBar = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      barRef.current.style.height = `${scrollPercent}%`;
    };

    container.addEventListener("scroll", updateBar);

    updateBar();

    return () => container.removeEventListener("scroll", updateBar);
  }, []);

  return (
    <div className="scroll-indicator">
      <div ref={barRef} className="scroll-indicator__bar"></div>
    </div>
  );
};

export default ScrollIndicator;