import { useEffect } from 'react';

const usePreloadImage = (src: string) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);
};

export default usePreloadImage;
