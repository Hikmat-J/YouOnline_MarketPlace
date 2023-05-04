import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import Form from "react-bootstrap/Form";

export default function RichTextArea(props) {
    const handleChange = (newValue) => {
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(newValue);
    };
    return (
        <Form.Group className={props.ContainerClass}>
            {props.Label && <Form.Label className={props.LabelClass}>{app.translate(props.Label)}</Form.Label>}
            <ReactQuill className={props.Class} value={props.Value} theme="snow" onChange={handleChange} />
        </Form.Group>
    );
}

RichTextArea.propTypes = {
    OnChange: PropTypes.func,
    Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    Label: PropTypes.string,
    Class: PropTypes.string,
    ContainerClass: PropTypes.string,
    LabelClass: PropTypes.string,
};
RichTextArea.defaultProps = {
    Class: "shadow-sm",
    ContainerClass: "my-2",
    LabelClass: "",
    Label: "",
};
