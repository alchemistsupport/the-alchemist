import { useEffect, useState } from 'react';

type BrowserWindow = {
  width?: number;
  height?: number;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<BrowserWindow>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export { useWindowSize };
