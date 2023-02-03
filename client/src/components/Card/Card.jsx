import './Card.scss';
import useViewport from '../../hooks/useViewport';
import { useRef } from 'react';

export default function Card(props) {
  const { isMobile } = useViewport();

  return (
    <div
      className={`card ${props.className ? props.className : ''} ${
        isMobile ? 'mobile' : ''
      }`}
    >
      {props.children}
    </div>
  );
}

Card.CardImg = function CardImg({ children, ...props }) {
  const cardImg = useRef();

  // useEffect(() => {
  //     if (props.width && props.height) {
  //         cardImg.current.style.width = props.width;
  //         cardImg.current.style.height = props.height;
  //     }
  // }, [props.width, props.height]);

  return (
    <div
      className={`card-img ${props.className ? props.className : ''}`}
      ref={cardImg}
    >
      {children}
    </div>
  );
};

Card.CardDetails = function CardDetails({ children, ...props }) {
  return (
    <div className={`card-details ${props.className ? props.className : ''}`}>
      {children}
    </div>
  );
};
