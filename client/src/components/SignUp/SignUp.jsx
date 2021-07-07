import { useState } from "react";
import Form from "../Form/Form";
// import authenticate from '../../utils/authenticate';

export default function SignUp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const changeUsername = (ev) => {
        setUsername(ev.target.value);
    };

    const changeEmail = (ev) => {
        setEmail(ev.target.value);
    };

    const changePassword = (ev) => {
        setPassword(ev.target.value);
    };

    const changeFirstName = (ev) => {
        setFirstName(ev.target.value);
    };

    const changeLastName = (ev) => {
        setLastName(ev.target.value);
    };

    const signUp = async (ev) => {
        ev.preventDefault();

        // First check if the entered inputs are valid
        
        // const response = await authenticate(`/api-auth/signup`, {
        //     username,
        //     email,
        //     password,
        //     firstName,
        //     lastName
        // });

        console.log(username, email, password, firstName, lastName);
        // console.log(response);
    };
    
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
            }, 
            firstName:{
                type: 'text',
                required: false,
                placeholder: 'First Name',
                onChange: changeFirstName
            },
            lastName: {
                type: 'text',
                required: false,
                placeholder: 'Last Name',
                onChange: changeLastName
            }
        },
        onSubmit: signUp
    };

    return (
        <div className='form-container sign-up'>
            <div className='form-title'>Sign Up</div>
            <Form {...formProps} />
        </div>
    );
}