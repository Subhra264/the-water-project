import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer (props) {
    return (
        <div className='footer'>
            <div className="footer-contains">
                <div className="footer-contain-header">
                    <h2>Important Links</h2>
                    <div className="footer-contain-link-container">
                        <Link to="./solutions">blogs</Link>
                        <Link to="./discussion">discussions</Link>
                        <Link to="./problems">problems</Link>
                    </div>
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