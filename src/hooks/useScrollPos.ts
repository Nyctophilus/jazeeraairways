import { useEffect, useState } from "react";

const useScrollPos = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 959) {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  return scrollPosition;
};

export default useScrollPos;
