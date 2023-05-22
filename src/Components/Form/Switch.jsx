import React from "react";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import Form from "react-bootstrap/Form";

export default function Switch(props) {
    const handleChange = (event) => {
        let {value} = event.target;
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(value, event);
    };
    const lang = app.getCookie("lang", "en");

    return (
        <Form.Check
            type="switch"
            className={props.Class}
            value={props.Value}
            id={props.Id}
            label={app.translate(props.Label)}
            onChange={handleChange}
            disabled={props.Disabled}
            size={props.Size}
            readOnly={props.ReadOnly}
            checked={props.Checked}
            reverse={lang === "ar"}
        />
    );
}

Switch.propTypes = {
    OnChange: PropTypes.func,
    Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    Label: PropTypes.string,
    Class: PropTypes.string,
    Size: PropTypes.string,
    Disabled: PropTypes.bool,
    ReadOnly: PropTypes.bool,
    Checked: PropTypes.bool,
};
Switch.defaultProps = {
    Class: "shadow-sm",
    Value: "Value",
    Size: "",
    Disabled: false,
    ReadOnly: false,
    Id: "switcher",
    Checked: false,
};
