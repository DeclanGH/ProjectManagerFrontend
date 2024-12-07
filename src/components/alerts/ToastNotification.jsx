import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {NOTIFICATION_DELAY} from "../../common/constants.js";

function ToastNotification({ show, variant, message, onClose }) {
    return (
        <ToastContainer style={{position: "fixed"}} position="bottom-end" className="p-3">
            <Toast
                onClose={onClose}
                show={show}
                delay={NOTIFICATION_DELAY}
                autohide
                bg={variant}
            >
                <Toast.Body className="text-light text-center">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

ToastNotification.propTypes = {
    show: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default ToastNotification;
