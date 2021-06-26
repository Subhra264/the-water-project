import { ViewportContext } from "../contexts";
import { useState, useEffect } from "react";

export default function ViewportProvider({ children }) { 
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        console.log('Viewport provider...');

        const handleResizeWindow = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        handleResizeWindow();
        window.addEventListener('resize', handleResizeWindow);

        return () => window.removeEventListener('resize', handleResizeWindow);
    }, []);

    return (
        <ViewportContext.Provider value={{width, height}} >
            {children}
        </ViewportContext.Provider>
    );
}