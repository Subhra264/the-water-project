import { useContext } from 'react';
import { ViewportContext } from '../utils/contexts';

// This hook returns the current width and height of the window
export default function useViewport() {
    const { width, height } = useContext(ViewportContext);
    const breakpoint = 780;

    const isMobile = width <= breakpoint;
    return {
        width,
        height,
        isMobile
    };
}