import { useState } from "react";
import Form from "../Form/Form";
// import authenticate from '../../utils/authenticate';

export default function LogIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const changeUsername = (ev) => {
        setUsername(ev.target.value);
    };

    const changePassword = (ev) => {
        setPassword(ev.target.value)
    };

    const changeEmail = (ev) => {
        setEmail(ev.target.value);
    };

    const signIn = async (ev) => {
        ev.preventDefault();

        // const response = await authenticate(`/api-auth/login`, {
        //     username,
        //     email,
        //     password
        // });

        console.log(username, email, password);
        // console.log(response);
    }
    
    const formProps = {
        fields: {
            username: {
                type: 'text',
                required: true,
                onChange: changeUsername
            },
            password: {
                type: 'password',
                required: true,
                onChange: changePassword
            },
            email: {
                type: 'email',
                required: true,
                onChange: changeEmail
            }
        },
        onSubmit: signIn,
        error
    };

    return (
        <div className='form-container log-in'>
            <div className='form-title'>Sign In</div>
            <Form {...formProps} />
        </div>
    );
}