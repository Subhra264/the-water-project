import { useState } from 'react';
import './Burger.scss';

export default function Burger({ children, showBurger }) {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleShowNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <>
      <div
        className={`burger ${showBurger ? '' : 'display-none'}`}
        onClick={toggleShowNavLinks}
      >
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      <div
        className={`${
          showBurger && showNavLinks
            ? 'display-nav-links'
            : showBurger
            ? 'display-none'
            : 'nav-links'
        }`}
      >
        {children.map((link, index) => (
          <div className="nav-link" key={index}>
            {link}
          </div>
        ))}
      </div>
    </>
  );
}
