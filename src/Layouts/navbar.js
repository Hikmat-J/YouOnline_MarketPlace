import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import RBNavbar from "react-bootstrap/Navbar";
import * as app from "../Services/app";

function Navbar() {
    return (
        <RBNavbar bg="light" expand="lg">
            <Container>
                <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
                <RBNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Classified/Home">{app.translate("classified")}</Nav.Link>
                        <Nav.Link href="/Automotive/Home">{app.translate("automotive")}</Nav.Link>
                        <Nav.Link href="/Property/Home">{app.translate("properties")}</Nav.Link>
                        <Nav.Link href="/Jobs/Home">{app.translate("jobs")}</Nav.Link>
                    </Nav>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
}

export default Navbar;
