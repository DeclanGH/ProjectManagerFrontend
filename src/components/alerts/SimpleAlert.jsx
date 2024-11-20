import PropTypes from "prop-types";
import {Alert} from "react-bootstrap";


function SimpleAlert({headerMessage, bodyMessage, footerMessage, variant, isDismissible}) {
    return (
        <Alert variant={variant} dismissible={isDismissible}>
            {headerMessage && <Alert.Heading>{headerMessage}</Alert.Heading>}
            <p>{bodyMessage}</p>
            {footerMessage &&
                <>
                    <hr/>
                    <p className="mb-0">{footerMessage}</p>
                </>
            }
        </Alert>
    );
}

SimpleAlert.propTypes = {
    headerMessage: PropTypes.string,
    bodyMessage: PropTypes.string.isRequired,
    footerMessage: PropTypes.string,
    variant: PropTypes.string.isRequired,
    isDismissible: PropTypes.bool.isRequired,
}

export default SimpleAlert;
