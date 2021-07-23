import Card from '../Card/Card';
import useViewport from '../../hooks/useViewport';
import logo from '../../assets/img/centered-logo.png';
import './Home.scss';

export default function Home () {
    const { isMobile } = useViewport();

    return (
        <div className={`home ${isMobile? 'mobile' : ''}`}>
            <div className="banner">
                <div className="banner-container">
                    <img src={logo} id="banner-img" />
                    <h1>Join the fight against climate change. You can help us!</h1>
                </div>
            </div>
            <div className="card-wrapper">
                <Card className="cards">
                    <Card.CardDetails className="card-details" >
                        <h1>How can you help us?</h1>
                        <p>Actually , I don’t know how you can help us. Do You have any suggestion so that you could help us?</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src="#" /></Card.CardImg>
                </Card>
                <Card className="cards alternate-cards">
                    <Card.CardDetails className="card-details">
                        <h1>How can you help us?</h1>
                        <p>Actually , I don’t know how you can help us. Do You have any suggestion so that you could help us?</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src="#" /></Card.CardImg>
                </Card>
                <Card className="cards">
                    <Card.CardDetails className="card-details">
                        <h1>How can you help us?</h1>
                        <p>Actually , I don’t know how you can help us. Do You have any suggestion so that you could help us?</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src="#" /></Card.CardImg>
                </Card>
                <Card className="cards alternate-cards">
                    <Card.CardDetails className="card-details">
                        <h1>How can you help us?</h1>
                        <p>Actually , I don’t know how you can help us. Do You have any suggestion so that you could help us?</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src="#" /></Card.CardImg>
                </Card>
                <Card className="cards">
                    <Card.CardDetails className="card-details">
                        <h1>How can you help us?</h1>
                        <p>Actually , I don’t know how you can help us. Do You have any suggestion so that you could help us?</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src="#" /></Card.CardImg>
                </Card>
            </div>
        </div>
    )
}