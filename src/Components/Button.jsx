import React from "react";
import PropTypes from "prop-types";
import * as app from "../Services/app";
import RBButton from "react-bootstrap/Button";

export default function Button(props) {
    const handleClick = (event) => {
        let {value} = event;
        if (props.OnClick && typeof props.OnClick === "function") props.OnClick(value, event);
    };
    return (
        <RBButton
            className={props.Class}
            variant={props.Variant}
            size={props.Size} 
            disabled={props.Disabled}
            active={props.Active}
            onClick={handleClick}
            type={props.Type}
            style={props.Style}
        >
            {props.StartIcon && props.StartIcon}
            {app.translate(props.Label)}
            {props.EndIcon && props.EndIcon}
        </RBButton>
    );
}

Button.propTypes = {
    OnClick: PropTypes.func,
    Label: PropTypes.string,
    Class: PropTypes.string,
    Variant: PropTypes.string,
    Size: PropTypes.string,
    Type: PropTypes.string,
    Style: PropTypes.object,
    Disabled: PropTypes.bool,
    Active: PropTypes.bool,
    StartIcon: PropTypes.element,
    EndIcon: PropTypes.element,
};
Button.defaultProps = {
    Label: "",
    Class: "text-light",
    Variant: "",
    Size: "",
    Type: "",
    Disabled: false,
    Active: false,
};
