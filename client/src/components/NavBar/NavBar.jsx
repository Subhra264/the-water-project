import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';
import { UserContext } from '../../utils/contexts';
import Burger from './Burger/Burger';
import './NavBar.scss';

export default function NavBar(props) {
    const { isMobile } = useViewport();
    const [showBurger, setShowBurger] = useState(false);
    const { userState } = useContext(UserContext);
    console.log('Rendered navbar');

    const navBarLinks = () => {
        if (!userState) {
            return [
                ['/sign-in', 'Sign In'],
                ['/sign-up', 'Sign Up']
            ];
        } else {
            return [
                [`/discussion/users/${userState.userId}/`, 'Profile']
            ];
        }
    };

    useEffect(() => {
        console.log("show burger not working...");
        setShowBurger(isMobile);
    }, [isMobile]);

    return (
        <div className='navbar'>
            <div className="logo">Logo</div>
            <div className={`nav-links-container`}>
                <Burger showBurger={showBurger}>
                    {
                        navBarLinks().map(link => (
                            <Link to={link[0]} key={link[1]}>{link[1]}</Link>
                        ))
                    }
                </Burger>
            </div>
        </div>
    );
}