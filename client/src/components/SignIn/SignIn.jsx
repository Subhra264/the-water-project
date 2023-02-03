import { useContext, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { manageUser } from '../../utils/actions/User.action';
import { UserContext } from '../../utils/contexts';
import { SERVER_HOST } from '../../utils/fetch-request';
import AuthenticationForm from '../Form/AuthenticationForm';
// import authenticate from '../../utils/authenticate';

export default function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const formProps = useRef({});
  const history = useHistory();
  const location = useLocation();
  const { userDispatch } = useContext(UserContext);

  const changeUsername = (ev) => {
    setUsername(ev.target.value);
  };

  const changePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const signIn = (ev) => {
    ev.preventDefault();
    if (!username || !password) {
      setError('Fill all the fields!');
      return;
    }

    // POST request to sign in
    fetch(SERVER_HOST + '/get-token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status_code && result.status_code !== 200)
          throw new Error(result.detail);
        console.log('Signed in user', result);

        // TODO: Use a better alternative to store the jwt tokens
        // Save the refresh and access tokens in the localstorage
        localStorage.setItem('refresh_token', result.refresh);
        localStorage.setItem('access_token', result.access);
        localStorage.setItem('userState', JSON.stringify(result));

        // Update the UserReducer state store
        userDispatch(manageUser(result));

        // Path to redirect to
        let redirectTo = '/';

        // Check if there is any redirectTo path is location.state
        if (location.state) {
          if (location.state.redirectTo) {
            redirectTo = location.state.redirectTo;
          }
        }
        history.push(redirectTo);
      })
      .catch((err) => {
        setError(err.message);
      });

    // console.log(response);
  };

  formProps.current = {
    formTitle: 'Sign In',
    fields: {
      username: {
        type: 'text',
        required: true,
        onChange: changeUsername,
      },
      password: {
        type: 'password',
        required: true,
        onChange: changePassword,
      },
    },
    onSubmit: signIn,
    error,
  };

  return (
    // <div className='form-container log-in'>
    //     <div className='form-title'>Sign In</div>
    //     <Form {...formProps} />
    // </div>
    <AuthenticationForm {...formProps.current} />
  );
}
