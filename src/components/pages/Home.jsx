import {Button, Card, Col, Container, Row} from "react-bootstrap";
import GeneralCard from "../cards/GeneralCard.jsx";
import HomeNavBar from "../navbars/HomeNavBar.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {ROUTE, TOAST_VARIANT} from "../../common/constants.js";
import {useState} from "react";
import ToastNotification from "../alerts/ToastNotification.jsx";
import {useNavigate} from "react-router-dom";

function Home() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const [toastNotification, setToastNotification] = useState({
        show: false, variant: TOAST_VARIANT.INFO, message: ""
    });

    const showToastNotification = (variant, message) => {
        setToastNotification({ show: true, variant: variant, message: message });
    };

    const handleNotAuthenticatedToast = () => {
        if (!isAuthenticated) {
            showToastNotification(TOAST_VARIANT.DANGER, "Log in to access this page");
        } else {
            navigate(ROUTE.DASHBOARD);
        }
    }

    return(
        <div className="project-manager-bg">
            <HomeNavBar/>
            <Container className="mt-4">

                <section className="text-center py-5">
                    <h1 className="display-4">Welcome to Project Manager</h1>
                    <p className="lead">Streamline your workflow and collaborate effectively.</p>
                    <Button variant="primary" size="lg" className="mt-3" onClick={handleNotAuthenticatedToast}>
                        Get Started
                    </Button>
                </section>

                <section className="mt-5">
                    <h2 className="text-center mb-4">Features</h2>
                    <Row>
                        <Col md={4}>
                            <GeneralCard >
                                <Card.Body className="text-center">
                                    <Card.Title>Task Management</Card.Title>
                                    <Card.Text>
                                        Organize tasks with ease and set priorities.
                                    </Card.Text>
                                </Card.Body>
                            </GeneralCard>
                        </Col>
                        <Col md={4}>
                            <GeneralCard >
                                <Card.Body className="text-center">
                                    <Card.Title>Team Collaboration</Card.Title>
                                    <Card.Text>
                                        Work together in real-time and boost productivity.
                                    </Card.Text>
                                </Card.Body>
                            </GeneralCard>
                        </Col>
                        <Col md={4}>
                            <GeneralCard>
                                <Card.Body className="text-center">
                                    <Card.Title>Progress Tracking</Card.Title>
                                    <Card.Text>
                                        Monitor project milestones and deadlines.
                                    </Card.Text>
                                </Card.Body>
                            </GeneralCard>
                        </Col>
                    </Row>
                </section>
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
            </Container>
        </div>
    )
}

export default Home
