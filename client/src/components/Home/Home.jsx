import Card from '../Card/Card';
import useViewport from '../../hooks/useViewport';
import logo from '../../assets/img/centered-logo.png';
import firstCartImage from '../../assets/img/home_first_cart.svg';
import secondCartImage from '../../assets/img/home_second_cart.svg';
import thirdCartImage from '../../assets/img/home_third_cart.svg';
import './Home.scss';
import { Link } from 'react-router-dom';

export default function Home () {
    const { isMobile } = useViewport();

    return (
        <div className={`home ${isMobile? 'mobile' : ''}`}>
            <div className="banner">
                <div className="banner-container">
                    <img src={logo} id="banner-img" alt='banner' />
                    <h1>Join the fight against climate change. You can help us!</h1>
                </div>
            </div>
            <div className="card-wrapper">
                <Card className="cards">
                    <Card.CardDetails className="card-details" >
                        <h1>How can you help us?</h1>
                        <p>Only your willpower to fight climate change is enough for us. Even if you are not able to donate, you can still help the community with your innovative ideas. Join us and help people solve the problems.</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src={firstCartImage} width="100%" alt='first card' /></Card.CardImg>
                </Card>
                <Card className="cards alternate-cards">
                    <Card.CardDetails className="card-details">
                        <h1>Share you ideas, innovations and problems</h1>
                        <p>We have a solution page for only this. You can share your innovations, opinions and experience by writing blogs. Your blog can motivate others to innovate for climate.</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src={secondCartImage} alt='second card'/></Card.CardImg>
                </Card>
                <Card className="cards">
                    <Card.CardDetails className="card-details">
                        <h1>Create topics and track progress</h1>
                        <p>Is your locality suffering from pollution or climate change? Share with rest of the world by creating a topic with details of your problem, get help and see your problems getting solved.</p>
                    </Card.CardDetails>
                    <Card.CardImg className="card-imgs"><img src={thirdCartImage} alt='third card'/></Card.CardImg>
                </Card>
                <div className="instructions">
                    <h1>How to use the discussion forum efficiently?</h1>
                    <div className="motivation">
                        <p>Discussion forum is our main focus. This forum is designed to let people upload and solve local or global climate related problems. In this era, various NGOs, activists and governments are trying to reduce the affect of climate change and pollution. They are trying their best. But they alone can not solve this. We, the people of the world, also have to join them. You don't have to spend money or join NGOs. You can start by simply working in your local area. But this is not always the case that you have a proper solution for the problem. Here comes our forum to help you.</p>
                        <p>Our forum is designed to address this particular problem. If you come from a coding background then you surely heard of Github. This is a website where developers from all over the world contribute remotely to other's projects free of charge. As a result, the project grows tremendously in a short amount of time. Similarly through our discussion forum, people from all over the world can share their ideas, innovations and experience ultimately resulting a great solution for your problem. Also nearby people or NGOs can also get a chance to solve the problem physically.</p>
                    </div>
                    <div className="using-forum">
                        <h3>Using the discussion forum</h3>
                        <ul>
                            <li>Create an <Link to='/sign-up'>account</Link></li>
                            <li>Now go to <Link to='/discussion'>discussion</Link></li>
                            <li>If you want to contribute, filter topics based on country, tags, location etc. Click on the topic and see the details in the description section. Check the existing issues, start working on them and join the discussion to share ideas.</li>
                            <li>If your want to post a problem, create a topic. Click on the "New problem" button and fill the details, upload images, share the location, add tags and click on "create topic" button. Your problem is now open for the world</li>
                            <li>Create issues to break the topic into smaller problems. Each issue has its own discussion thread. Use it to discuss the issue.</li>
                            <li>Create progress report for your owned topics. create tasks that need to be completed to solve/close the topic.</li>
                            <li>Once the topic is solved, close it by clicking on the "close topic" button. Similarly click on "close issue" button to close issues that you have created.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}