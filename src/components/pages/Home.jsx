import {useAuth0} from "@auth0/auth0-react";
import {Container, Nav, Navbar} from "react-bootstrap";
import LogoutButton from "../buttons/LogoutButton.jsx";
import LoginButton from "../buttons/LoginButton.jsx";
import {ROUTE} from "../../common/constants.js";

function Home() {
    const { isAuthenticated } = useAuth0();

    return(
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href={ROUTE.HOME}>Project Manager</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={ROUTE.HOME}>About</Nav.Link>
                </Nav>
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Container>
        </Navbar>
    )
}

export default Home
