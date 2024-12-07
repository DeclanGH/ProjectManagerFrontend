import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeNavBar from "../navbars/HomeNavBar.jsx";

function AboutPage() {
    return (
        <div className="project-manager-bg">
            <HomeNavBar/>
            <Container className="mt-4 project-manager-bg">

                <section className="text-center py-5">
                    <h1>About the Product</h1>
                    <p className="lead">
                        For small to mid-sized teams and individual project managers who need a simple, user-friendly, and cost-free tool to organize and manage projects, the Project Manager is a web-based application that offers streamlined project management capabilities similar to Jira, but without the cost. Unlike other free managers, our product enables users to easily create and manage boards, timebox backlogs into sprints, organize teams into manageable groups, and track progress through comprehensive reporting, all in one interface.
                    </p>
                </section>

                <section className="text-center py-5">
                    <h1>About Me</h1>
                    <p className="lead">
                        My name is Declan Onunkwo. I am Software Engineering student at the State University of New York at Oswego.
                    </p>
                </section>

                <section className="mt-5 text-center">
                    <h2>Connect with Me</h2>
                    <p>
                        Feel free to check out my work on GitHub or connect with me on professional networks.
                    </p>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <a
                                href="https://github.com/DeclanGH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark mx-3"
                                style={{fontSize: '2rem'}}
                            >
                                <i className="bi bi-github"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/declanonunkwo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary mx-3"
                                style={{fontSize: '2rem'}}
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </Col>
                    </Row>
                </section>
            </Container>
        </div>
    );
}

export default AboutPage;
