import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useViewport from '../../hooks/useViewport';
import { manageUser } from '../../utils/actions/User.action';
import { UserContext } from '../../utils/contexts';
import Burger from './Burger/Burger';
import './NavBar.scss';

export default function NavBar(props) {
    const { isMobile } = useViewport();
    const [showBurger, setShowBurger] = useState(false);
    const { userState, userDispatch } = useContext(UserContext);

    const navBarLinks = () => {
        if (!userState) {
            return [
                <Link to='/sign-in' key='sign-in'>Sign In</Link>,
                <Link to='/sign-up' key='sign-up'>Sign Up</Link>,
            ];
        } else {
            return [
                <Link to={`/discussion/users/${userState.id}/`} key='profile'>Profile</Link>,
                <Link to='/discussion/create-ngo/' key='create-ngo'>Create NGO</Link>,
                <button onClick={logOut} key='log-out'>Log out</button>
            ];
        }
    };

    // Logs out the user
    const logOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userState');
        userDispatch(manageUser(null));
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
                        // navBarLinks().map(link => (
                        //     <Link to={link[0]} key={link[1]}>{link[1]}</Link>
                        // ))
                        navBarLinks()
                    }
                </Burger>
            </div>
        </div>
    );
}