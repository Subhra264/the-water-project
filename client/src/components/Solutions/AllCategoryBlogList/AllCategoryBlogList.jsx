import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Gigs from '../Gigs/Gigs';
import categories from '../../../utils/blog-categories';
import './AllCategoryBlogList.scss';
import { getRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';

export default function AllcategoryBlogList (props) {
    const [blogs, setBlogs] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const successHandler = (result) => {
            setBlogs(result);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching blogs', errMessage);
        };

        // Fetch all type of blogs
        getRequest(
            '/blogs/',
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    }, []);

    return (
        <div className="all-category-blog-list">
            {
                loading?
                    <Loader width='5em'/>
                :
                    <>
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
                                        <Gigs gigList={blogs[category[0]]} />
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
                                <Gigs gigList={blogs.popular_stories} />
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}