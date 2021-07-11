import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';
import './Slider.scss';

export default function Slider (props) {
    const sliderBarRef = useRef();
    const location = useLocation();
    const { width } = useViewport();

    // Contains all the label refs
    const labelRefs = useRef([]);
    // Contains all the routes
    const labelRoutes = useRef([]);


    // Returns the labelRoutes index of the current matching route
    const currentRouteIndex = () => {
        let currentRouteIndex = 0;
        for (let i in labelRoutes.current) {
            // If location.pathname is equal to or starts with one of the labelRoutes,
            // then return the current route index
            if (location.pathname === labelRoutes.current[i] 
                || (labelRoutes.current[i] !== '/' 
                    && location.pathname.startsWith(labelRoutes.current[i])
                )) {
                currentRouteIndex = i;
                break;
            }
        }

        return currentRouteIndex;
    };

    // Function to adjust the width and position of the slider-bar
    const onSelect = (index) => {
        if (!sliderBarRef.current) return;
        sliderBarRef.current.style.width = labelRefs.current[index].current.offsetWidth + 'px';
        
        let leftPos = 0;
        for (let i = 0; i < index; i++) {
            leftPos = leftPos + labelRefs.current[i].current.offsetWidth;
        }
        sliderBarRef.current.style.left = leftPos + 'px';
    };

    useEffect(() => {
        onSelect(currentRouteIndex());
    }, [location, width]);

    return (
        <div className="slider">
            <div className="slider-labels">
                {
                    props.labels.map((label, index) => {
                        labelRoutes.current[index] = label.linkTo;
                        labelRefs.current[index] = label.ref;

                        return (
                            <div className="slider-label" ref={label.ref} onClick={() => { onSelect(index) }}>
                                <Link to={label.linkTo}>
                                    {label.name}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
            <div className="slider-bar" ref={sliderBarRef}></div>
        </div>
    );
}

// TODO: Organise the Labels
// Slider.Label = function Label (props) {
//     const labelRef = useRef();
   
//     useEffect(() => {
//         Slider.prototype.labelRoutes[props.index] = props.linkTo;
//         Slider.prototype.labelRefs[props.index] = labelRef;    
//     }, [props.linkTo, labelRef.current, props.index]);

//     return (
//         <div className="slider-label" ref={labelRef} onClick={Slider.prototype.onSelect(props.index)}>
//             <Link to={props.linkTo}>
//                 {props.children}
//             </Link>
//         </div>
//     );
// };