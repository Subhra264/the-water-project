import { useEffect, useRef } from "react";

export default function useResizeObserver(elemRefs, callback) {
    const resizeObserver = useRef(new ResizeObserver(entries => {
        entries.forEach((entry, index) => {
            callback(entry);
        })
    }));

    useEffect(() => {
        elemRefs.forEach(elemRef => {
            if (elemRef.current) {
                resizeObserver.current.observe(elemRef.current);
            }
        });

        return () => {
            elemRefs.forEach(elemRef => {
                resizeObserver.current.unobserve(elemRef.current);
            });
        }
    }, []);

}