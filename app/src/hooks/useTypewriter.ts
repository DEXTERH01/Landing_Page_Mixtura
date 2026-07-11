import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    indexRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayText(text.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          setIsComplete(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}
