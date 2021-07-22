import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Country } from '../ContentEditor/TopicEditor/TopicEditor';
import AuthenticationForm from '../Form/AuthenticationForm';
// import authenticate from '../../utils/authenticate';

export default function SignUp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [age, setAge] = useState('');
    const country = useRef(null);
    const formProps = useRef({});
    const history = useHistory();

    const changeUsername = (ev) => {
        setUsername(ev.target.value);
    };

    const changeEmail = (ev) => {
        setEmail(ev.target.value);
    };

    const changePassword = (ev) => {
        setPassword(ev.target.value);
    };

    const changeAge = (ev) => {
        setAge(ev.target.value);
    };

    const changeFirstName = (ev) => {
        setFirstName(ev.target.value);
    };

    const changeLastName = (ev) => {
        setLastName(ev.target.value);
    };

    const signUp = (ev) => {
        ev.preventDefault();

        // First check if the entered inputs are valid
        if (!username || !password || !email || !country.current.value) {
            setError('Fill all the required fields!');
            return;
        }

        // POST request to register the user
        fetch('/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                country: country.current.value,
                age,
                first_name: firstName,
                last_name: lastName
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
            history.push('/sign-in');
        })
        .catch(err => {
            setError(err.message);
        })

        console.log(username, email, password, firstName, lastName);
        // console.log(response);
    };
    
    formProps.current = {
        formTitle: 'Sign Up',
        fields: {
            username: {
                type: 'text',
                required: true,
                placeholder: 'username (Required)',
                onChange: changeUsername
            },
            password: {
                type: 'password',
                required: true,
                placeholder: 'password (Required)',
                onChange: changePassword
            },
            email: {
                type: 'email',
                required: true,
                placeholder: 'email (Required)',
                onChange: changeEmail
            },
            age: {
                type: 'number',
                required: false,
                placeholder: 'Your Age(Optional)',
                min: '10',
                max: '100',
                onChange: changeAge
            },
            firstName:{
                type: 'text',
                required: false,
                placeholder: 'First Name(Optional)',
                onChange: changeFirstName
            },
            lastName: {
                type: 'text',
                required: false,
                placeholder: 'Last Name(Optional)',
                onChange: changeLastName
            }
        },
        onSubmit: signUp,
        error
    };

    return (
        <AuthenticationForm {...formProps.current} >
            <Country selectedCountry={country} />
        </AuthenticationForm>
    );
}