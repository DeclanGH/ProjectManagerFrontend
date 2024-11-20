import {Button, Offcanvas, Stack} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import PropTypes from "prop-types";
import CreatorBadge from "../badges/CreatorBadge.jsx";
import OwnerBadge from "../badges/OwnerBadge.jsx";

function ProjectOffCanvas({ projectDetails }) {

    const [showOverlay, setShowOverlay] = useState(false);

    const handleOverlayShow = () => setShowOverlay(true);
    const handleOverlayClose = () => setShowOverlay(false);

    const getFullName = (firstName, lastName) => {
        return (lastName !== "") ? `${firstName} ${lastName} ` : `${firstName} `;
    }

    const getDateWithoutTime = (date) => {
        return String(date).split("T")[0];
    }

    return(
        <>
            <div>
                <Button variant="link" onClick={handleOverlayShow}>
                    <FontAwesomeIcon color="black" icon={faInfoCircle} size="2x" />
                </Button>
            </div>

            <Offcanvas placement="end" show={showOverlay} onHide={handleOverlayClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Project Info</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p className="text-muted">Name: {projectDetails.projectTitle}</p>
                    <p className="text-muted">Created: {getDateWithoutTime(projectDetails.projectCreateDate)}</p>
                    <p className="text-muted">By: {getFullName(projectDetails.projectCreator.firstName,
                        projectDetails.projectCreator.lastName)}</p>
                    <div className="border-top w-100 mt-5 mb-5"></div>
                    <p className="text-muted">{projectDetails.projectDescription}</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default ProjectOffCanvas;

ProjectOffCanvas.propTypes = {
    projectDetails: PropTypes.object.isRequired
}
