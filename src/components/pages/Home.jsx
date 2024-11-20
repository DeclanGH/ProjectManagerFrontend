import {useAuth0} from "@auth0/auth0-react";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import LogoutButton from "../buttons/LogoutButton.jsx";
import LoginButton from "../buttons/LoginButton.jsx";
import {APPLICATION_NAME, ROUTE} from "../../common/constants.js";

function Home() {
    const { isAuthenticated } = useAuth0();

    return(
        <Navbar expand={"lg"} className="navbar-dark bg-dark mb-3">
            <Container fluid={true}>
                <Navbar.Brand href={ROUTE.HOME}>{APPLICATION_NAME}</Navbar.Brand>
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
                            <Nav.Link href={ROUTE.HOME}>About</Nav.Link>
                            <Nav.Link href={ROUTE.DASHBOARD}>Dashboard</Nav.Link>
                        </Nav>
                        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Home
