import { useEffect, RefObject } from "react";

const useItemOnScreen = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  options: any
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
};

export default useItemOnScreen;
