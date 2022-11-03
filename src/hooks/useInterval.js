import { useEffect, useRef } from 'react';

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }
