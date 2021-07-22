import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        
        const successHandler = (result) => {
            setBlog(result);
            setLoading(false);
        };
        
        const errorHandler = (errMessage) => {
            console.log(errMessage);
        };
        
        // Load the blog
        getRequest(`/blogs/${blogId}`, accessToken, successHandler, errorHandler);
    }, []);

    return (
        <div className="blog">
            {
                loading?
                    <Loader width='5em' />
                :
                    <>
                        <div className="blog-title">
                            {blog.title}
                        </div>
                        <div className="blog-writer-date">
                            <div className="blog-writer">Written by <i>@{blog.creator.username}</i> </div>
                            <div className="blog-date">Last Updated on {parseDate(blog.updated_on)}</div>
                        </div>
                        <div className="blog-content">
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