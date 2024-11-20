import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";

function SprintBadgeHandler({ sprintDetail}) {
    if (!sprintDetail) return null;

    const { isOpen, isDue } = sprintDetail;

    return (
        <>
            {isOpen && !isDue && <Badge bg="success" className="ms-2">Open</Badge>}
            {isOpen && isDue && <Badge bg="warning" className="ms-2">Due</Badge>}
            {!isOpen && <Badge bg="danger" className="ms-2">Closed</Badge>}
        </>
    );
}

SprintBadgeHandler.propTypes = {
    sprintDetail: PropTypes.object.isRequired,
}

export default SprintBadgeHandler;