import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { parseDate } from '../../utils/date';
import { getRequest, protectedRequest } from '../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../utils/manage-tokens';
import ImgSelector from '../ContentEditor/ImgSelector/ImgSelector';
import Loader from '../Loader/Loader';
import './Profile.scss';

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const inputFileRef = useRef(null);
  const history = useHistory();

  const updateProfilePic = () => {
    const successHandler = (result) => {
      setProfile((oldProfile) => ({
        ...oldProfile,
        profile_pic: result.profile_pic,
      }));

      // Check if there is any successHandler in props
      // if (props.successHandler) {
      //     props.successHandler(result);
      // }
    };

    const errorHandler = (errMessage) => {
      setError(errMessage);
    };

    if (inputFileRef.current.files[0]) {
      const formData = new FormData();
      formData.append('profile_pic', inputFileRef.current.files[0]);

      const fetchDetails = {
        fetchURI: `${props.fetchURI}`,
        method: 'PATCH',
        isFormData: true,
        body: formData,
      };

      protectedRequest(
        fetchDetails,
        getAccessTokenFromStorage(),
        successHandler,
        errorHandler,
      );
    }
  };

  useEffect(() => {
    const successHandler = (result) => {
      setProfile(result);

      // Check if there is any successHandler in props
      if (props.successHandler) {
        props.successHandler(result);
      }
      setLoading(false);
    };

    const errorHandler = (errMessage) => {
      console.log('Error fetching profile data', errMessage);
      if (errMessage === 'page_not_found') history.push('/not-found');
    };

    getRequest(
      `${props.fetchURI}`,
      getAccessTokenFromStorage(),
      successHandler,
      errorHandler,
    );
  }, []);

  return (
    <div className="profile-container">
      {loading ? (
        <Loader width="3em" />
      ) : (
        <div className="profile">
          <div className="profile-header">
            <div className="profile-pic">
              {profile.profile_pic ? (
                <img
                  src={profile.profile_pic}
                  title="Profile Pic"
                  alt="Profile"
                  className="profile-pic-user-img"
                />
              ) : (
                <FontAwesomeIcon
                  icon={`${props.isNGO ? 'users' : 'user-circle'}`}
                  className="profile-pic-user-circle"
                />
              )}
            </div>
            {(props.isPresident || props.thisUser) && (
              <div className="update-profile-pic">
                <ImgSelector title="" inputFileRef={inputFileRef} />
                <button onClick={updateProfilePic}>Update</button>
              </div>
            )}
            {profile.username && (
              <div className="profile-username">@{profile.username}</div>
            )}
            <div className="profile-name">
              {props.isNGO
                ? profile.name
                : `${profile.first_name} ${profile.last_name}`}
            </div>
            <div className="joined-on">
              Joined on {parseDate(profile.date_joined)}
            </div>
          </div>
          <div className="error">
            {props.error && <div className="err-message">{props.error}</div>}
            {error && <div className="err-message">{error}</div>}
          </div>
          <div className="profile-details-container">
            {!props.isNGO && (
              <div className="contributions">
                No. of Contributions : {profile.no_of_contributions}{' '}
              </div>
            )}
            <div className="profile-details"></div>
            {props.isNGO ? (
              <>
                <div className="email">
                  Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
                <div className="address">Address : {profile.address}</div>
                <div className="help-line">
                  Help Line : {profile.phone_number}
                </div>
                <div className="ngo-members">
                  <div className="owner">
                    President :
                    <span className="member-details">
                      <span className="member-profile-pic">
                        {profile.owner.profile_pic ? (
                          <img
                            src={profile.owner.profile_pic}
                            alt="Owner"
                            className="profile-pic-user-img"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon="user-circle"
                            className="profile-pic-user-circle"
                          />
                        )}
                      </span>
                      <Link to={`/discussion/users/${profile.owner.id}`}>
                        <span className="member-username">
                          {profile.owner.username}
                        </span>
                      </Link>
                    </span>
                  </div>
                  <div className="no-of-members">
                    Total No. of members : {props.members.length}
                  </div>
                  {props.members.map((member) => (
                    <div className="member" key={member.id}>
                      <div className="member-details-container">
                        <span className="member-details">
                          <span className="member-profile-pic">
                            {member.profile_pic ? (
                              <img
                                src={member.profile_pic}
                                alt="Member"
                                className="profile-pic-user-img"
                                title="Profile Pic"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon="user-circle"
                                className="profile-pic-user-circle"
                              />
                            )}
                          </span>
                          <Link to={`/discussion/users/${member.id}`}>
                            <span className="member-username">
                              {member.username}
                            </span>
                          </Link>
                        </span>
                      </div>
                      {props.isPresident && (
                        <div className="remove-member">
                          <button onClick={() => props.removeMember(member.id)}>
                            Remove member
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  {(props.isMember || props.isPresident) && (
                    <div className="add-member-container">
                      <div className="add-member-button">
                        <button onClick={props.addMember}>Add Member</button>
                      </div>
                      {props.invitationLink && (
                        <div className="add-member-link">
                          Share this link with others (Only valid for 24 hours)
                          <div className="link">{props.invitationLink}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {profile.age && (
                  <div className="profile-age">Age : {profile.age}</div>
                )}
                {profile.address && (
                  <div className="profile-address">
                    Address : {profile.address}{' '}
                  </div>
                )}
                <div className="profile-country">
                  Country : {profile.country}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
