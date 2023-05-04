import PropTypes from "prop-types";
import * as app from "../../Services/app";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function ImgOverlay(props) {
    const [control, setControl] = useState({})
    const handleClick = (event) => {
        let { value } = event;
        if (props.OnClick && typeof props.OnClick === "function") props.OnClick(value, event);
    };
    return (
        <Card className={props.Class} onClick={handleClick}>
            <Card.Img src={props.Src} alt={props.Alt} style={{ opacity: props.Opacity }} />
            <Card.ImgOverlay>
                <Card.Title>{app.translate(props.Title)}</Card.Title>
                <Card.Text>{app.translate(props.Text)}</Card.Text>
                <Card.Text>{app.translate(props.FooterText)}</Card.Text>
            </Card.ImgOverlay>
        </Card>
    );
}

export default ImgOverlay;
ImgOverlay.propTypes = {
    OnClick: PropTypes.func,
    Title: PropTypes.string,
    Text: PropTypes.string,
    Alt: PropTypes.string,
    FooterText: PropTypes.string,
    Src: PropTypes.string,
    Opacity: PropTypes.string
};
ImgOverlay.defaultProps = {
    Title: "",
    Class: "bg-dark text-white",
    Text: "",
    FooterText: "",
    Alt: "image",
    Opacity: "0.5"
};
