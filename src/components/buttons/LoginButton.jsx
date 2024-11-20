import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import {BUTTON_LABEL} from "../../common/constants.js";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button variant="primary" onClick={() => loginWithRedirect()}>
            {BUTTON_LABEL.LOGIN}
        </Button>
    );
};

export default LoginButton;
