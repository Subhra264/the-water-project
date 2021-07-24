import { useContext, useEffect, useState } from 'react';
import { parseDate } from '../../../utils/date';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { getRequest, protectedRequest } from '../../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../../utils/manage-tokens';
import { UserContext } from '../../../utils/contexts';
import '../Profile.scss';
import './JoinNGO.scss';

export default function JoinNGO (props) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState('');
    const [alreadyJoined, setAlreadyJoined] = useState(false);
    const { ngoId, joinToken } = useParams();
    const { userState } = useContext(UserContext);

    const joinNGO = () => {
        const successHandler = (result) => {
            setInfo('Successfully joined the NGO');
        };

        const errorHandler = (errMessage) => {
            setInfo(errMessage);
        };

        const fetchDetails = {
            fetchURI: '/ngos/add-member/',
            method: 'PATCH',
            body: {
                access_token: joinToken
            }
        };

        // PATCH request to join the NGO
        protectedRequest(
            fetchDetails,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    };

    useEffect(() => {

        const successHandler = (result) => {
            setProfile(result);
            setLoading(false);
        };

        const errorHandler = (errMessage) => {
            setInfo(errMessage);
        };

        // Fetch some information about the NGO
        getRequest(
            `/ngos/${ngoId}/`,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    }, []);

    useEffect(() => {
        if (userState) {
            if (userState.owned_orgs.includes(+ngoId)
                || userState.membered_orgs.includes(+ngoId)) {
                setAlreadyJoined(true);
            }
        }
    }, [userState]);

    return (
        <div className="profile-container">
            {
                loading?
                    <Loader width='5em' />
                : 
                    <div className="profile-header">
                        <div className="profile-pic">

                        </div>
                        <div className="profile-name"><Link to={`/discussion/ngos/${ngoId}`}>{profile.name}</Link></div>
                        <div className="joined-on">Joined on {parseDate(profile.date_joined)}</div>
                        <div className="owner">
                            President : 
                            <span className="member-details">
                                <span className="member-profile-pic"></span>
                                <Link to={`/discussion/users/${profile.owner.id}`}>
                                    <span className="member-username">{profile.owner.username}</span>
                                </Link>
                            </span>
                        </div>
                        <div className="email"> Email : <a href={`mailto:${profile.email}`}>{profile.email}</a></div>

                        {
                            userState?
                                alreadyJoined?
                                    <div className="info">You are already a member!</div>
                                :
                                    <div className="join-ngo">
                                        <button onClick={joinNGO}>Join NGO</button>
                                    </div>
                            :
                                <div className="info">
                                    You need to Sign in first
                                </div>
                        }
                        {
                            info && <div className="info">
                                {info}
                            </div>
                        }
                    </div>
            }
            
        </div>
    );
}