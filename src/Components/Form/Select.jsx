import React from "react";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import Form from "react-bootstrap/Form";

export default function Select(props) {
    const handleChange = (event) => {
        let {value} = event.target;
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(value, props.Options, event);
    };
    return (
        <Form.Group className={props.ContainerClass}>
            {props.Label && <Form.Label className={props.LabelClass}>{app.translate(props.Label)}</Form.Label>}
            <Form.Select
                className={props.Class}
                size={props.Size}
                placeholder={props.Placeholder}
                value={props.Value}
                onChange={handleChange}
                disabled={props.Disabled}
            >
                {props.Options.length > 0 &&
                    props.Options.map((item) => {
                        return (
                            <option key={item[props.Key]} value={item[props.Key]}>
                                {item[props.KeyValue]}
                            </option>
                        );
                    })}
            </Form.Select>
        </Form.Group>
    );
}

Select.propTypes = {
    OnChange: PropTypes.func,
    Options: PropTypes.array.isRequired,
    Label: PropTypes.string,
    Key: PropTypes.string,
    KeyValue: PropTypes.string,
    Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    Placeholder: PropTypes.string,
    HintText: PropTypes.string,
    Class: PropTypes.string,
    ContainerClass: PropTypes.string,
    LabelClass: PropTypes.string,
    Size: PropTypes.string,
    Type: PropTypes.string,
    Disabled: PropTypes.bool,
    ReadOnly: PropTypes.bool,
};
Select.defaultProps = {
    Class: "shadow-sm",
    ContainerClass: "",
    LabelClass: "",
    Key: "Key",
    KeyValue: "Value",
    Placeholder: "",
    Size: "",
    Type: "",
    Disabled: false,
    ReadOnly: false,
};
