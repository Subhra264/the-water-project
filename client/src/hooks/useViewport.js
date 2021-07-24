import { useContext, useEffect, useState } from 'react';
import { ViewportContext } from '../utils/contexts';

const breakpoint = 525;

// This hook returns the current width and height of the window
export default function useViewport() {
    const { width, height } = useContext(ViewportContext);
    const [isMobile, setIsMobile] = useState(width <= breakpoint);

    //TODO: Add tab viewport

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