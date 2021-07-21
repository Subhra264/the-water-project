import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryFromId } from '../../../utils/blog-categories';
import Loader from '../../Loader/Loader';
import Gig from '../Gigs/Gig/Gig';
import './BlogList.scss';

export default function BlogList (props) {
    const { blogCategoryId } = useParams();
    const [loading, setLoading] = useState(true);
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        fetch(`/blogs/${blogCategoryId}/`)
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            console.log('Blog list', result);
            setBlogList(result);
            setLoading(false);
        })
        .catch(err => {
            console.log('Error fetching blog-lists', err.message);
        });
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