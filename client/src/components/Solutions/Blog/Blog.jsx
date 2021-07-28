import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useViewport from '../../../hooks/useViewport';
import { categoryFromId } from '../../../utils/blog-categories';
import { parseDate } from '../../../utils/date';
import { getRequest } from '../../../utils/fetch-request';
import parseHTML from '../../../utils/parseHTML';
import Like from '../../IconButton/Like';
import Loader from '../../Loader/Loader';
import './Blog.scss';

export default function Blog (props) {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const { blogId } = useParams();
    const { isMobile } = useViewport();
    const history = useHistory();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        
        const successHandler = (result) => {
            setBlog(result);
            setLoading(false);
        };
        
        const errorHandler = (errMessage) => {
            console.log(errMessage);
            if (errMessage === 'page_not_found') history.push('/not-found');
        };
        
        // Load the blog
        getRequest(`/blogs/${blogId}`, accessToken, successHandler, errorHandler);
    }, []);

    return (
        <div className={`blog ${isMobile? 'mobile' : ''}`}>
            {
                loading?
                    <Loader width='5em' />
                :
                    <>
                        <div className="blog-title">
                            {blog.title}
                        </div>
                        <div className="blog-writer-date">
                            <div className="blog-writer">Written by <Link to={`/discussion/users/${blog.creator.id}`}><i>@{blog.creator.username}</i></Link> </div>
                            <div className="blog-date">Last Updated on {parseDate(blog.updated_on)}</div>
                        </div>
                        <div className="blog-content">
                            {blog.front_img && <img src={blog.front_img} title={`Front image of ${blog.title}`} />}
                            {parseHTML(blog.content)}
                        </div>
                        <div className="blog-impressions">
                            <div className="blog-impression">
                                <Like 
                                    userLiked={blog.likes.user_liked}
                                    noOfLikes={blog.likes.no_of_likes}
                                    fetchURI={`/blogs/${blogId}/add-remove-likes/`}
                                />
                            </div>
                        </div>
                        <div className="blog-meta-tags">
                            <div className="blog-meta-tag">{categoryFromId(blog._type)}</div>
                            {
                                blog.tags.map(tag => (
                                    <div className="blog-meta-tag" key={tag.id}>{tag.name}</div>
                                ))
                            }
                        </div>
                    </>
            }
        </div>
    );
}