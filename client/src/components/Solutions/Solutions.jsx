import Gig from './Gig/Gig';
import Card from '../Card/Card';
import './Solutions.scss';

export default function Solutions (props) {
    return (
        <div className='solutions'>
            <Card>
                <Card.CardImg></Card.CardImg>
                <Card.CardDetails>
                    <div className="card-body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dolorem fuga accusamus voluptatum eius a sequi suscipit ipsam id quibusdam, placeat doloribus repellendus mollitia eligendi.
                    </div>
                    <div className="card-article-link">
                        Show More
                    </div>
                </Card.CardDetails>
            </Card>
            <div className="blog-group-container success-stories">
                <div className="blog-group-header">
                    <div className="blog-group-name">Success Stories</div>
                    <div className="blog-group-see-more">See More</div>
                </div>
                <div className="blog-group">
                    <Gig /> 
                    <Gig /> 
                    <Gig /> 
                    <Gig /> 
                </div>
            </div>
            <div className="blog-group-container success-stories">
                <div className="blog-group-header">
                    <div className="blog-group-name">Popular Stories</div>
                    <div className="blog-group-see-more">See More</div>
                </div>
                <div className="blog-group">
                    <Gig /> 
                    <Gig /> 
                    <Gig /> 
                    <Gig /> 
                </div>
            </div>           
        </div>
    );
}