import {Container, Dropdown, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {APPLICATION_NAME, BUTTON_LABEL, LINK_LABEL, ROUTE} from "../../common/constants.js";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useState} from "react";
import TextCopyModal from "../modals/TextCopyModal.jsx";
import {GET_PROJECT_INVITE_LINK_PATH, GET_USER_DETAILS} from "../../graphql/queries.js";
import {useMutation, useQuery} from "@apollo/client";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import {DELETE_PROJECT} from "../../graphql/mutations.js";


function ProjectPageNavBar() {
    const navigate = useNavigate();
    const { projectId, groupId } = useParams();
    const { user, logout } = useAuth0();
    const [showTextCopyModal, setShowTextCopyModal] = useState(false);
    const [projectInviteLink, setProjectInviteLink] = useState("");
    console.log("project id: ", projectId)
    console.log("group id: ", groupId)

    const { data: projectMember, loading: projectMemberLoading, error: projectMemberError } =
        useQuery(GET_USER_DETAILS, {
            variables: { userEmail: user.email, projectId: projectId, groupId: groupId },
        });
    const userDetails = projectMember?.getUserDetails;

    const { data: inviteData, loading: inviteLoading, error: inviteError } =
        useQuery(GET_PROJECT_INVITE_LINK_PATH, {
            variables: { projectId, userEmail: user.email },
            //fetchPolicy: "network-only"
    });

    const [deleteProject, { loading: deleteLoading, error: deleteError }] =
        useMutation(DELETE_PROJECT, {
            variables: { projectId: projectId, userEmail: user.email },
            onCompleted: () => {
                navigate(ROUTE.DASHBOARD);
                },
            onError: (error) => {
                console.error("Error deleting project:", error.message);
                },
        });


    const goToHome = () => {
        navigate(ROUTE.HOME);
    }

    const goToDashboard = () => {
        navigate(ROUTE.DASHBOARD);
    }

    const generateInviteLink = () => {
        if (inviteData && !inviteError) {
            setProjectInviteLink(
                `${window.location.protocol}//${window.location.host}${ROUTE.INVITE}${inviteData?.getProjectInviteLinkPath}`
            );
            setShowTextCopyModal(true);
        } else {
            return (<p>{inviteError.message}</p>);
        }
    }

    const handleDeleteProject = () => {
        deleteProject()
    }

    const onClose = () => {
        setProjectInviteLink("");
        setShowTextCopyModal(false);
    }

    const onLogout = () => {
        logout()
    }

    if (projectMemberLoading || inviteLoading || deleteLoading) {
        return <LoadingSpinner />;
    }

    if (projectMemberError && inviteError && deleteError) {
        return <p>{projectMemberError.message} {inviteError.message} {deleteError.message}</p>
    }

    return(
        <div>
            <Navbar expand={"lg"} className="navbar-dark bg-dark mb-3">
                <Container fluid={true}>
                    <Navbar.Brand onClick={goToHome} style={{ cursor: "pointer" }}>{APPLICATION_NAME}</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-lg"} />
                    <Navbar.Offcanvas
                        aria-labelledby="offcanvasNavbarLabel-expand-lg"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>{APPLICATION_NAME}</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link onClick={goToHome}>{LINK_LABEL.HOME}</Nav.Link>
                                <Nav.Link onClick={goToDashboard}>{LINK_LABEL.DASHBOARD}</Nav.Link>
                                <NavDropdown title={LINK_LABEL.PROJECT_ACTIONS} id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={generateInviteLink}
                                        disabled={!userDetails.isCreator && !userDetails.isOwner}
                                    >
                                        {LINK_LABEL.INVITE_MEMBERS}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={handleDeleteProject}
                                        disabled={!userDetails.isCreator}
                                    >
                                        {LINK_LABEL.DELETE_PROJECT}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-white">
                            <img
                                alt="user"
                                src={user.picture}
                                width="40"
                                height="40"
                                className="rounded-circle"
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={onLogout} className="text-danger">
                                {BUTTON_LABEL.LOGOUT}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
            <TextCopyModal
                onClose={onClose}
                textToCopy={projectInviteLink}
                show={showTextCopyModal}
                title={"Project Invite Link"}
            />
            {inviteLoading && <LoadingSpinner/>}
        </div>
    );
}

export default ProjectPageNavBar;
