import './Card.scss';
import useViewport from '../../hooks/useViewport';

export default function Card (props) {
    const { isMobile } = useViewport();

    return (
        <div className={`card ${isMobile? 'mobile' : ''}`}>
            {props.children}
        </div>
    );
}

Card.CardImg = function CardImg ({children}) {
    return (
        <div className='card-img'>
            {children}
        </div>
    );
};

Card.CardDetails = function CardDetails ({children}) {
    return (
        <div className='card-details'>
            {children}
        </div>
    );
};