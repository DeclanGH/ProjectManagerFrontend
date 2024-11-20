import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import {BUTTON_LABEL} from "../../common/constants.js";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button variant="secondary"
                onClick={() => logout()}>
            {BUTTON_LABEL.LOGOUT}
        </Button>
    );
};

export default LogoutButton;
