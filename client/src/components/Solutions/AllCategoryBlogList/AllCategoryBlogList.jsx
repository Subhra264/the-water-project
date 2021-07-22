import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Gigs from '../Gigs/Gigs';
import categories from '../../../utils/blog-categories';
import './AllCategoryBlogList.scss';

export default function AllcategoryBlogList (props) {
    const [blogs, setBlogs] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all type of blogs
        fetch('/blogs/')
        .then(res => res.json())
        .then(result => {
            console.log('Blogs', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            setBlogs(result);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error fetching blogs', err.message);
        })
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