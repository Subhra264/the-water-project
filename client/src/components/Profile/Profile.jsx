import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Profile (props) {
    const { profileId } = useParams();
    const [loading, setLoading] = useState(true);

    return (
        <div className="profile">
            {
                loading? 
                    <Loader width='3em' />
                :
                    <div className="profile-header">

                    </div>
            }
        </div>
    )
}