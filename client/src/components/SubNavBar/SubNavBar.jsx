import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SubNavBar.scss';

export default function SubNavBar(props) {
    const offsetWidths = useRef([]);
    const linkRefs = useRef([useRef(null), useRef(null), useRef(null), useRef(null)]);
    const selectedBar = useRef(null);

    const barItems = [
        ['/', 'Home'],
        ['/problems', 'Problems'],
        ['/solutions', 'Solutions'],
        ['/discussion', 'Discussion'],
    ];

    useEffect(() => {
        offsetWidths.current[0] = linkRefs.current[0].current.offsetWidth;
        offsetWidths.current[1] = linkRefs.current[1].current.offsetWidth;
        offsetWidths.current[2] = linkRefs.current[2].current.offsetWidth;
        offsetWidths.current[3] = linkRefs.current[3].current.offsetWidth;
        console.log(offsetWidths.current);
    }, [offsetWidths, linkRefs]);

    const onSelect = (index) => {
        console.log('hello from onSelect', offsetWidths.current);
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
                {console.log('I am rendered again')}
                {
                    barItems.map((link, index) => (
                        <div className='sub-navbar-item' key={link[1]} ref={linkRefs.current[index]} onClick={() => { onSelect(index) }}>
                            <Link to={link[0]}>{link[1]}</Link>
                        </div>
                    ))
                }
            </div>
            <div className='selected-bar' ref={selectedBar}></div>
        </div>
    )
}