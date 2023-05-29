import React from "react";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";

export default function Input(props) {
    // const lang = app.getCookie("lang", "en");
    const handleChange = (event) => {
        let {value} = event.target;
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(value, event);
    };
    return (
        <Form.Group className={props.ContainerClass} controlId={"control_" + props.Label}>
            {props.Label && <Form.Label className={props.LabelClass}>{app.translate(props.Label)}</Form.Label>}
            <InputGroup className={props.InputGroupClass} hasValidation>
                {props.StartIcon && (
                    <InputGroup.Text className={"m-0 p-0 " + props.StartIconClass}>{props.StartIcon}</InputGroup.Text>
                )}
                <Form.Control
                    required={props.Required}
                    as={props.ShowAs && props.ShowAs}
                    rows={props.Rows}
                    min={props.Min}
                    size={props.Size}
                    type={props.Type}
                    className={props.Class}
                    placeholder={app.translate(props.Placeholder)}
                    disabled={props.Disabled}
                    readOnly={props.ReadOnly}
                    value={props.Value}
                    onChange={handleChange}
                    lang={app.getCookie("lang", "en")}
                />
                {props.EndIcon && <InputGroup.Text>{props.EndIcon}</InputGroup.Text>}{" "}
                {props.WithTrueFeedback && (
                    <Form.Control.Feedback>{app.translate(props.TrueFeedback)}</Form.Control.Feedback>
                )}
                {props.WithFalseFeedback && (
                    <Form.Control.Feedback type="invalid">{app.translate(props.FalseFeedback)}</Form.Control.Feedback>
                )}
            </InputGroup>
            {props.HintText && <Form.Text>{props.HintText}</Form.Text>}
        </Form.Group>
    );
}

Input.propTypes = {
    OnChange: PropTypes.func,
    Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    Label: PropTypes.string,
    ShowAs: PropTypes.string,
    Placeholder: PropTypes.string,
    HintText: PropTypes.string,
    Class: PropTypes.string,
    ContainerClass: PropTypes.string,
    InputGroupClass: PropTypes.string,
    LabelClass: PropTypes.string,
    Size: PropTypes.string,
    Type: PropTypes.string,
    Rows: PropTypes.number,
    Min: PropTypes.number,
    Disabled: PropTypes.bool,
    ReadOnly: PropTypes.bool,
    StartIcon: PropTypes.element,
    EndIcon: PropTypes.element,
    StartIconClass: PropTypes.string,
    Required: PropTypes.bool,
    WithFalseFeedback: PropTypes.bool,
    WithTrueFeedback: PropTypes.bool,
    TrueFeedback: PropTypes.string,
    FalseFeedback: PropTypes.string,
};
Input.defaultProps = {
    Class: "shadow-sm",
    Value: "",
    ContainerClass: "my-2",
    LabelClass: "",
    Placeholder: "",
    Size: "",
    Type: "",
    Disabled: false,
    ReadOnly: false,
    Required: false,
    StartIconClass: "",
    Rows: 3,
    TrueFeedback: "",
    FalseFeedback: "fieldrequired",
    WithFalseFeedback: false,
    WithTrueFeedback: false,
};
