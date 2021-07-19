import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryFromId } from '../../../utils/blog-categories';
import Loader from '../../Loader/Loader';
import './Blog.scss';

export default function Blog (props) {
    const [blog, setBlog] = useState({});
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const { blogId } = useParams();

    const toggleLike = (ev) => {
        // PATCH request to toggle like
        fetch(`blogs/${blogId}/add-remove-likes/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json)
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            setLiked(result.likes.user_liked);

        }).catch(err => {
            console.log('Error liking the blog', err);
        });
    };

    useEffect(() => {
        // Load the blog
        fetch(`/blogs/${blogId}`)
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);

            console.log('Blog', result);
            setBlog(result);
            setLiked(result.likes.user_liked);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching the blog', err);
        });
    }, []);

    return (
        <div className="blog">
            {
                loading?
                    <Loader />
                :
                    <>
                        <div className="blog-title">
                            {blog.title}
                        </div>
                        <div className="blog-writer-date">
                            <div className="blog-writer">Written by <i>@{blog.user.username}</i> </div>
                            <div className="blog-date">Last Updated on {blog.updated_on}</div>
                        </div>
                        <div className="blog-content">
                            {blog.content}
                        </div>
                        <div className="blog-impressions">
                            <div className="blog-impression">
                                <div className="blog-impression-icon" onClick={toggleLike} >
                                    {
                                        <FontAwesomeIcon icon={liked? 'heart' : ['far', 'heart']} />
                                    }
                                </div>
                                <div className="blog-impression-no">
                                    {blog.likes.no_of_likes}
                                </div>
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