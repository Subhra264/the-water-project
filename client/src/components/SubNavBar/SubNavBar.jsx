import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SubNavBar.scss';

const subNavBarContainerMobStyle = {
    position: 'absolute',
    bottom: '0px'
}

export default function SubNavBar(props) {
    const offsetWidths = useRef([]);
    const linkRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);
    const selectedBar = useRef(null);
    const location = useLocation();
    console.log('location', location);

    const barItems = [
        ['/', <FontAwesomeIcon icon='home' />, 'Home'],
        ['/problems', <FontAwesomeIcon icon='exclamation-circle' />, 'Problems'],
        ['/solutions', <FontAwesomeIcon icon='check-circle' />, 'Solutions'],
        ['/discussion', <FontAwesomeIcon icon='comments' />, 'Discussion']
    ];

    useEffect(() => {
        for (let i = 0; i <= 3; i++) {
            offsetWidths.current[i] = linkRefs.current[i].current.offsetWidth;
        }
    }, [offsetWidths, linkRefs]);

    useEffect(() => {
        let currentRouteIndex = 0;
        for (let i in barItems) {
            if (barItems[i][0] === location.pathname) {
                currentRouteIndex = i;
                break;
            }
        }
        
        onSelect(currentRouteIndex);
    }, []);

    const onSelect = (index) => {
        if (!selectedBar.current) return;
        selectedBar.current.style.width = offsetWidths.current[index] + 'px';
        let leftPos = 0;
        for (let i = 0; i < index; i++) {
            leftPos = leftPos + offsetWidths.current[i];
        }
        selectedBar.current.style.left = leftPos + 'px';
    };

    return (
        <div className='sub-navbar-container'>
            <div className='sub-navbar'>
                {
                    barItems.map((link, index) => (
                        <div className='sub-navbar-item' key={link[2]} ref={linkRefs.current[index]} onClick={() => { onSelect(index) }}>
                            <Link to={link[0]}>{link[2]}</Link>
                        </div>
                    ))
                }
            </div>
            <div className='selected-bar' ref={selectedBar}></div>
        </div>
    )
}