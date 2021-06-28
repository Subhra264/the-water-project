import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';
import Burger from './Burger/Burger';
import './NavBar.scss';

const navBarLinks = [
    ['/sign-in', 'Sign In'],
    ['/sign-up', 'Sign Up']
];

export default function NavBar(props) {
    const { isMobile } = useViewport();
    const [showBurger, setShowBurger] = useState(false);

    useEffect(() => {
        console.log("show burger not working...");
        setShowBurger(isMobile);
    }, [isMobile]);

    return (
        <div className='navbar'>
            <div className="logo">Logo</div>
            <div className={`nav-links-container`}>
                {/* <div className="nav-links">
                    {
                        navBarLinks.map(link => (
                            <div className='nav-link'>
                                <Link to={link[0]} >{link[1]}</Link>
                            </div>
                        ))
                    }
                </div>
                <div>

                </div> */}
                <Burger showBurger={showBurger}>
                    {
                        navBarLinks.map(link => (
                            <Link to={link[0]} key={link[1]}>{link[1]}</Link>
                        ))
                    }
                </Burger>
            </div>
        </div>
    );
}