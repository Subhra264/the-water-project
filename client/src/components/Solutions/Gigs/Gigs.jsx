import { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import Gig from './Gig/Gig';

export default function Gigs (props) {
    const [gigList, setGigList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${props.fetchURI}/`)
        .then(res => res.json())
        .then(result => {
            console.log('Blogs', result);
            if (result.status_code && result.status_code !== 200) throw new Error(result.details);
            setGigList(result);
            setLoading(false);
        }).catch(err => {
            console.log('Error fetching blogs:', err.message);
        });
    }, []);

    return (
        <>
            {
                loading?
                    <Loader width='4em' />
                :
                    !gigList.length?
                        <div className="no-results-container">
                            <div className="no-results">No Blogs</div>
                        </div>
                    :
                        gigList.map(gig => (
                            <Gig {...gig} key={gig.id} />
                        ))
            }
        </>
    )
}