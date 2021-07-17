import Gig from './Gig/Gig';
import Card from '../Card/Card';
import './Solutions.scss';
import { Link, Switch, Route } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import BlogEditor from '../ContentEditor/BlogEditor/BlogEditor';

export default function Solutions (props) {
    const matchURL = useMatchURL();

    return (
        <div className='solutions'>
            <Switch>
                <Route path={`${matchURL}`} exact>
                    <div className="create-blog-container">
                        Do you have any <b>Solution</b>, <b>Innovative Idea</b> or a <b>Success Story/Motivational Story</b> how you successfully helped to fight water crisis? Write and share with the rest of the world 
                        <div className="card-article-link">
                            <Link to={`${matchURL}/new-blog`}>Create a Blog</Link>
                        </div>
                    </div>
                    <Card>
                        <Card.CardImg></Card.CardImg>
                        <Card.CardDetails>
                            <div className="card-body">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dolorem fuga accusamus voluptatum eius a sequi suscipit ipsam id quibusdam, placeat doloribus repellendus mollitia eligendi.
                            </div>
                            <div className="card-article-link">
                                <Link to={`${matchURL}/the-water-project-blogs`}>
                                    Show More
                                </Link>
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
                </Route>
                <Route path={`${matchURL}/new-blog`}>
                    <BlogEditor />
                </Route>
            </Switch>
        </div>
    );
}