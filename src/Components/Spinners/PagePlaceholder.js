import {Col, Placeholder, Row, Spinner} from "react-bootstrap";

export default function PagePlaceholder(props) {
    return (
        <>
            <Placeholder className="w-100 h-100" animation="glow">
                <Row className="w-100">
                    <Col xs={12} className=" position-absolute " style={{top: "50%", left: "50%"}}>
                        <Spinner animation="grow" />
                    </Col>
                    <Col>
                        {/* <Placeholder xs={12} className="my-1" style={{height: 150}} />
                        <Placeholder xs={6} className="my-5" style={{height: 300}} />
                        <Placeholder xs={6} className="" style={{height: 300}} /> */}
                    </Col>
                    <Col>{/* <Placeholder xs={12} style={{height: 500}} /> */}</Col>
                </Row>
            </Placeholder>
        </>
    );
}
