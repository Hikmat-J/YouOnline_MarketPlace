import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {redirect, useNavigate} from "react-router-dom";
import RBNavbar from "react-bootstrap/Navbar";
import * as app from "../Services/app";

function Navbar() {
    const navigate = useNavigate();
    return (
        <RBNavbar bg="light" expand="lg">
            <Container>
                <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
                <RBNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <Nav.Link
                            onClick={() => {
                                navigate("/Classified/Home");
                            }}
                        >
                            {app.translate("classified")}
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/Automotive/Home");
                            }}
                        >
                            {app.translate("automotive")}
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/Property/Home");
                            }}
                        >
                            {app.translate("properties")}
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                navigate("/Jobs/Home");
                            }}
                        >
                            {app.translate("jobs")}
                        </Nav.Link>
                    </Nav>
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    );
}

export default Navbar;
