import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import { isThisUser } from '../../utils/user-utils';
import Profile from './Profile';

export default function UserProfile(props) {
  const { profileId } = useParams();
  const { userState } = useContext(UserContext);
  const [thisUser, setThisUser] = useState(false);
  console.log('profileId', profileId);

  useEffect(() => {
    setThisUser(isThisUser(userState, profileId));
  }, [userState, profileId]);

  return <Profile fetchURI={`/users/${profileId}/`} thisUser={thisUser} />;
}
