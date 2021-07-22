import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import Form from './Form';

export default function AuthenticationForm (props) {
    const { userState } = useContext(UserContext);

    return (
        <>
            {
                userState?
                    <Redirect to='/' />
                :
                    <Form {...props}>
                        {props.children}
                    </Form>
            }
        </>
    );
}