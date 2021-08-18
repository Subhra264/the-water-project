import { Link } from 'react-router-dom';
import './Footer.scss';
import footerSvg from '../../assets/img/fish.svg';
import useViewport from '../../hooks/useViewport';

export default function Footer (props) {
    const { isMobile } = useViewport();
    return (
        <div className={`footer ${isMobile? 'mobile' : ''}`}>
            <div className="footer-contains">
                <div className="footer-contain-header">
                    <h1>Important Links</h1>
                    <div className="footer-contain-link-container">
                        <Link to="/solutions">blogs</Link>
                        <Link to="/discussion">discussions</Link>
                        <Link to="/problems">problems</Link>
                    </div>
                </div>
                <div className="fish-container">
                    <img src={footerSvg} alt='footer svg'/>
                </div>
                <blockquote className="quote-container">
                    <p>Climate change is no longer a far-off problem; It is happening here, it is happening now.</p>
                    <span> Barak Obama</span>
                </blockquote>
            </div>
            <div className="line"></div>
            <div className="footer-copyright">
                copyright 2021 - all rights reserved. The-water-project
            </div>
        </div>
    );
}