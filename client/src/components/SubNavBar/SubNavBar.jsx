import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SubNavBar.scss';
import useViewport from '../../hooks/useViewport';

export default function SubNavBar(props) {
    const offsetWidths = useRef([]);
    const linkRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);
    const selectedBar = useRef(null);
    const location = useLocation();
    const { isMobile, width } = useViewport();

    const barItems = [
        ['/', <FontAwesomeIcon icon='home' />, 'Home'],
        ['/problems', <FontAwesomeIcon icon='exclamation-circle' />, 'Problems'],
        ['/solutions', <FontAwesomeIcon icon='check-circle' />, 'Solutions'],
        ['/discussion', <FontAwesomeIcon icon='comments' />, 'Discussion']
    ];

    const currentRouteIndex = () => {
        let currentRouteIndex = 0;
        for (let i in barItems) {
            if (barItems[i][0] === location.pathname) {
                currentRouteIndex = i;
                break;
            }
        }

        return currentRouteIndex;
    };

    const onSelect = (index) => {
        if (!selectedBar.current) return;
        selectedBar.current.style.width = offsetWidths.current[index] + 'px';
        let leftPos = 0;
        for (let i = 0; i < index; i++) {
            leftPos = leftPos + offsetWidths.current[i];
        }
        selectedBar.current.style.left = leftPos + 'px';
    };

    const determineBarPosition = () => {
        for (let i in linkRefs.current) {
            offsetWidths.current[i] = linkRefs.current[i].current.offsetWidth;
        }

        onSelect(currentRouteIndex());
    };

    useEffect(() => {
        determineBarPosition();
    }, [isMobile, location]);

    useEffect(() => {       
        if (isMobile) determineBarPosition();
    }, [width, isMobile]);

    return (
        <div className={`sub-navbar-container ${isMobile? 'mobile' : ''}`} >
            <div className='sub-navbar'>
                {
                    barItems.map((link, index) => (
                        <div className='sub-navbar-item' key={link[2]} ref={linkRefs.current[index]} onClick={() => { onSelect(index) }}>
                            <Link to={link[0]}>
                                {link[isMobile? 1 : 2]}
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className='selected-bar' ref={selectedBar}></div>
        </div>
    )
}