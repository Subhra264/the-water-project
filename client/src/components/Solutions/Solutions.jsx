import Gig from './Gigs/Gig/Gig';
import Card from '../Card/Card';
import './Solutions.scss';
import { Link, Switch, Route } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import BlogEditor from '../ContentEditor/BlogEditor/BlogEditor';
import Gigs from './Gigs/Gigs';
import Blog from './Blog/Blog';
import BlogList from './BlogList/BlogList';
import categories from '../../utils/blog-categories';

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
                                <Link to={`${matchURL}/blogs/the-water-project/`}>
                                    Show More
                                </Link>
                            </div>
                        </Card.CardDetails>
                    </Card>
                    {
                        categories.map(category => (
                            <div className="blog-group-container" key={category[0]}>
                                <div className="blog-group-header">
                                    <div className="blog-group-name">{category[1]}</div>
                                    <div className="blog-group-see-more">
                                        <Link to={`/solutions/blogs/category/${category[0]}`}>See More</Link>
                                    </div>
                                </div>
                                <div className="blog-group">
                                    <Gigs fetchURI={`/blogs/${category[0]}`} />
                                </div>
                            </div>
                        ))
                    }
                    <div className="blog-group-container success-stories">
                        <div className="blog-group-header">
                            <div className="blog-group-name">Popular Stories</div>
                            <div className="blog-group-see-more">
                                <Link to='/solutions/blogs'>See More</Link>
                            </div>
                        </div>
                        <div className="blog-group">
                            <Gigs fetchURI='/blogs' />
                        </div>
                    </div>
                </Route>
                <Route path={`${matchURL}/new-blog`}>
                    <BlogEditor />
                </Route>
                <Route path={`${matchURL}/blogs/:blogId`} exact>
                    <Blog />
                </Route>
                <Route path={`${matchURL}/blogs/category/:blogCategoryId`}>
                    <BlogList />
                </Route>
            </Switch>
        </div>
    );
}