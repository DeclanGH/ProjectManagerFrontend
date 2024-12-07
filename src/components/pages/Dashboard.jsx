import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {Link} from "react-router-dom";
import {ALERT_VARIANT, ROUTE} from "../../common/constants.js";
import DashboardNav from "../navbars/DashboardNav.jsx";
import ProjectCard from "../cards/ProjectCard.jsx";
import {Col, Container, Row} from "react-bootstrap";
import {GET_USER_PROJECTS} from "../../graphql/queries.js";
import { useQuery } from "@apollo/client";
import ToastNotification from "../alerts/ToastNotification.jsx";
import {TOAST_VARIANT} from "../../common/constants.js"
import SimpleAlert from "../alerts/SimpleAlert.jsx";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import "../../styles/ProjectManager.css";

function Dashboard() {
    const { user, logout } = useAuth0();
    const [toastNotification, setToastNotification] = useState({
        show: false, variant: TOAST_VARIANT.INFO, message: "" });

    const { loading, error, data } = useQuery(GET_USER_PROJECTS, {
        variables: { email: user?.email },
        skip: !user?.email
    });

    const showToastNotification = (variant, message) => {
        setToastNotification({ show: true, variant: variant, message: message });
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="project-manager-bg">
            <DashboardNav
                userEmail={user?.email}
                profileImage={user?.picture}
                onLogout={logout}
                showToastNotification={showToastNotification}
            />

            <ToastNotification
                show={toastNotification.show}
                variant={toastNotification.variant}
                message={toastNotification.message}
                onClose={() => setToastNotification({
                    show: false,
                    variant: TOAST_VARIANT.INFO,
                    message: ""
                })}
            />

            {loading && <LoadingSpinner/>}

            {error &&
                <SimpleAlert
                    headerMessage="🤒 Oh snap!"
                    bodyMessage="Looks like the server might be down at the moment"
                    variant={ALERT_VARIANT.DANGER}
                    isDismissible={false}
                />
            }

            {!error && data && data.getUserProjects?.length > 0 ? (
                <>
                    <Container className="mt-4">
                        <Row className="g-4">
                            {data?.getUserProjects?.map(project => (
                                <Col key={project.id} sm={6} md={4} lg={3}>
                                    <Link
                                        to={`${ROUTE.PROJECT}/${project.id}`}
                                        style={{ textDecoration: "none" }}>
                                        <ProjectCard
                                            title={project.title}
                                            description={project.description}
                                            color="grey"
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            ) : (<p>Create your first project! 🚀</p>)}
        </div>
    );
}

export default Dashboard;
