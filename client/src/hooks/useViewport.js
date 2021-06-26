import { useContext, useEffect, useState } from 'react';
import { ViewportContext } from '../utils/contexts';

// This hook returns the current width and height of the window
export default function useViewport() {
    const breakpoint = 525;
    const { width, height } = useContext(ViewportContext);
    console.log('Width', width);
    const [isMobile, setIsMobile] = useState(width <= breakpoint);

    console.log('isMobile', isMobile);

    useEffect(() => {
        setIsMobile(width <= breakpoint);
    }, [width]);

    // const isMobile = width <= breakpoint;
    return {
        width,
        height,
        isMobile
    };
}