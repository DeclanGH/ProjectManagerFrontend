import PropTypes from "prop-types";
import {Alert} from "react-bootstrap";


function SimpleAlert({children, headerMessage, bodyMessage, footerMessage, variant, isDismissible}) {
    return (
        <Alert variant={variant} dismissible={isDismissible}>
            {headerMessage &&
                <Alert.Heading>{headerMessage}</Alert.Heading>
            }

            <div className="d-flex align-items-center">
                {children && <div className="me-2">{children}</div>}
                <p className="mb-0">{bodyMessage}</p>
            </div>

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
    children: PropTypes.node,
    headerMessage: PropTypes.string,
    bodyMessage: PropTypes.string.isRequired,
    footerMessage: PropTypes.string,
    variant: PropTypes.string.isRequired,
    isDismissible: PropTypes.bool.isRequired,
}

export default SimpleAlert;
