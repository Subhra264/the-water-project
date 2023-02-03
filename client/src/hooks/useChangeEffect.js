import { useEffect, useRef } from 'react';

// Avoids running the callback the first time
export default function useChangeEffect(callback, deps) {
  const renderedFirstTime = useRef(false);

  useEffect(() => {
    if (renderedFirstTime.current) {
      callback();
    } else {
      renderedFirstTime.current = true;
    }
  }, [...deps]);
}
