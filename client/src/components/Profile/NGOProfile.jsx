import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import { protectedRequest } from '../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../utils/manage-tokens';
import Profile from './Profile';

export default function NGOProfile (props) {
    const { userState } = useContext(UserContext);
    const [profileProps, setProfileProps] = useState({});
    const { profileId } = useParams();
    const removeMember = useRef(null);
    const getProfileSuccessHandler = useRef(null);
    const addMember = useRef(null);

    // Called when Profile.jsx successfully fetches the ngo profile
    getProfileSuccessHandler.current = (result) => {
        setProfileProps((oldProfileProps) => {
            return {
                ...oldProfileProps,
                members: result.members
            };
        });
    };

    // When the NGO admin clicks the 'remove member' button
    removeMember.current = (userId) => {

        // Called when given user is successfully removed from the NGO
        const successHandler = (result) => {
            const members = [...profileProps.members];
            console.log('Existing members', members);

            let indexOfMemberToRemove;
            for (const member in members) {
                console.log('typeof member id', typeof members[member].id)
                console.log('typeof user id', typeof userId)
                if (members[member].id = userId) {
                    indexOfMemberToRemove = member;
                    console.log('Index of member to remove', indexOfMemberToRemove);
                    break;
                }
            }

            if (indexOfMemberToRemove >= 0) {
                members.splice(indexOfMemberToRemove, 1);
            }

            setProfileProps({
                ...profileProps,
                members
            });
        };

        // Called when an error occurs
        const errorHandler = (errMessage) => {
            console.log('Error removing user', errMessage);
            setProfileProps({
                ...profileProps,
                error: errMessage
            });
        };

        const fetchDetails = {
            fetchURI: '/ngos/remove-member/',
            method: 'DELETE',
            body: {
                ngo_id: profileId,
                user_id: userId
            }
        };

        protectedRequest(
            fetchDetails,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    };

    // Called when the 'add member' button is clicked
    addMember.current = () => {
        const successHandler = (result) => {
            console.log('URL host', window.location.host);
            setProfileProps({
                ...profileProps,
                invitationLink: `${window.location.host}/discussion/join-ngo/${profileId}/${result.access_token}`
            });
        };

        const errorHandler = (errMessage) => {
            console.log('Error creating invitation link', errMessage);
            setProfileProps({
                ...profileProps,
                error: errMessage
            })
        };

        const fetchDetails = {
            fetchURI: `/ngos/${profileId}/create-invitation-link/`,
            method: 'POST'
        };

        // Get the add-member token
        protectedRequest(
            fetchDetails,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    };

    useEffect(() => {
        
        if (userState) {
            if (userState.owned_orgs.includes(+profileId)) {
                setProfileProps({
                    ...profileProps,
                    isPresident: true
                });
            } else if (userState.membered_orgs.includes(+profileId)) {
                setProfileProps({
                    ...profileProps,
                    isMember: true
                });
            }
        }
    }, [userState, profileId]);

    return  (
        <Profile 
            isNGO
            {...profileProps}
            successHandler={getProfileSuccessHandler.current}
            removeMember={removeMember.current}
            addMember={addMember.current}
            fetchURI={`/ngos/${profileId}/`}
        />
    );
}