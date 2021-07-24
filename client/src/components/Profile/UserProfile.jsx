import { useParams } from 'react-router-dom';
import Profile from './Profile';

export default function UserProfile (props) {
    const { profileId } = useParams();
    console.log('profileId', profileId);
    return (
        <Profile fetchURI={`/users/${profileId}/`} />
    );
}