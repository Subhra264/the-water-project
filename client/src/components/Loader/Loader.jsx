import { useEffect, useRef } from 'react';
import './Loader.scss';

export default function Loader (props) {
    const loader = useRef();

    useEffect(() => {
        if (props.width) {
            loader.current.style.width = props.width;
            loader.current.style.height = props.width;
        }
    }, [props.width]);

    return (
        <div className='loader-container' >
            <div className="loader" ref={loader}></div>
        </div>
    );
}