import {Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {APPLICATION_NAME, BUTTON_LABEL} from "../../common/constants.js";
import PropTypes from "prop-types";
import CreateProjectModal from "../modals/CreateProjectModal.jsx";

function DashboardNav({ userEmail, profileImage, onLogout, showToastNotification }) {
    return(
        <>
            <Navbar className="bg-dark">
                <Container fluid>
                    <Navbar.Brand href={window.location.origin}>
                        {APPLICATION_NAME}
                    </Navbar.Brand>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <CreateProjectModal
                                userEmail={userEmail}
                                showToastNotification={showToastNotification}
                            />

                            <Dropdown align="end">
                                <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-white">
                                    <img
                                        alt="user"
                                        src={profileImage}
                                        width="40"
                                        height="40"
                                        className="rounded-circle"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ right: 0, left: 'auto', top: '60px', position: 'absolute' }}>
                                    <Dropdown.Item onClick={onLogout} className="text-danger">
                                        {BUTTON_LABEL.LOGOUT}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

DashboardNav.propTypes = {
    userEmail: PropTypes.string,
    profileImage: PropTypes.string,
    onLogout: PropTypes.func.isRequired,
    showToastNotification: PropTypes.func.isRequired,
};

export default DashboardNav;
