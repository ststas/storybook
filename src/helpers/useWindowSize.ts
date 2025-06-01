import throttle from 'lodash/throttle';
import { useLayoutEffect, useState } from 'react';

/**
 * Window size custom hook
 *
 * @param {object} options - hook options
 * @param {number} options.throttleMs - custom throttle delay (Ms)
 * @returns {object} - current window width and height
 */
export function useWindowSize(
  { throttleMs }: { throttleMs?: number } = { throttleMs: 100 },
): { width: number; height: number } {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const handleResize = throttle(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, throttleMs);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [throttleMs]);

  return { width, height };
}
