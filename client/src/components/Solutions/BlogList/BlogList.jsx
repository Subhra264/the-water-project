import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryFromId } from '../../../utils/blog-categories';
import { getRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import Loader from '../../Loader/Loader';
import Gig from '../Gigs/Gig/Gig';
import './BlogList.scss';

export default function BlogList (props) {
    const { blogCategoryId } = useParams();
    const [loading, setLoading] = useState(true);
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {

        const successHandler = (result) => {
            setBlogList(result.results);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            console.log('Error fetching blog-lists', errMessage);
        };

        // Fetch all the blogs of the given category
        getRequest(
            `/blogs/${blogCategoryId}/`,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );

    }, []);

    return (
        <div className="blog-list-container">
            <div className="blog-list-title-container">
                {categoryFromId(blogCategoryId)}
            </div>
            <div className="blog-list">
                {
                    loading?
                        <Loader width='5em' />
                    :
                        blogList.length?
                            blogList.map(blog => (
                                <Gig {...blog} key={blog.id} />
                            ))
                        :
                            <div className="no-results-container">
                                <div className="no-results">No Blogs Under this Category</div>
                            </div>
                }
            </div>
        </div>
    )
}