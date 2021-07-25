import { useState, useRef, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useMatchURL } from '../../hooks/useMatch';
import { addToOwnedNGO } from '../../utils/actions/User.action';
import { UserContext } from '../../utils/contexts';
import { protectedRequest } from '../../utils/fetch-request';
import { getAccessTokenFromStorage } from '../../utils/manage-tokens';
import Form from '../Form/Form';

export default function NGOForm (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [helpLine, setHelpLine] = useState();
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const formProps = useRef({});
    const history = useHistory();
    const { userState, userDispatch } = useContext(UserContext);
    const matchURL = useMatchURL();

    const changeName = (ev) => {
        setName(ev.target.value);
    };

    const changeEmail = (ev) => {
        setEmail(ev.target.value);
    };

    const changeHelpLine = (ev) => {
        setHelpLine(ev.target.value);
    };

    const changeAddress = (ev) => {
        setAddress(ev.target.value);
    };

    // Makes POST request to create a NGO
    const createNGO = (ev) => {
        ev.preventDefault();

        // First check if the entered inputs are valid
        if (!name || !email || !helpLine || !address) {
            setError('Fill all the required fields!');
            return;
        }

        const successHandler = (result) => {
            userDispatch(addToOwnedNGO({
                id: result.id,
                name: result.name,
                profile_pic: result.profile_pic
            }));
            history.push(`/discussion/ngos/${result.id}`);
        };

        const errorHandler = (errMessage) => {
            console.log('Error creating ngo', errMessage);
            setError(errMessage);
        };

        const fetchDetails = {
            fetchURI: '/ngos/',
            method: 'POST',
            body: {
                name,
                email,
                address,
                phone_number: helpLine
            }
        };

        protectedRequest(
            fetchDetails,
            getAccessTokenFromStorage(),
            successHandler,
            errorHandler
        );
    };

    formProps.current = {
        formTitle: 'Create NGO',
        fields: {
            name: {
                type: 'text',
                required: true,
                placeholder: 'NGO name (Required)',
                onChange: changeName
            },
            email: {
                type: 'email',
                required: true,
                placeholder: 'email (Required)',
                onChange: changeEmail
            },
            helpLine: {
                type: 'tel',
                required: true,
                placeholder: 'Helpline number for your NGO(Required)',
                pattern: '/^\+\d{9,15}$/',
                onChange: changeHelpLine
            },
            address: {
                type: 'text',
                required: true,
                placeholder: 'NGO address (Requierd)',
                onChange: changeAddress
            }
        },
        onSubmit: createNGO,
        error
    };

    return (
        <>
            {
                userState?
                    <Form {...formProps.current} />
                :
                    <Redirect to={{
                            pathname: '/sign-in',
                            state: {
                                redirectTo: matchURL
                            }
                        }}
                    />
            }
        </>
    );
}