import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import {useEffect, useState} from "react";

export default function PhoneInput(props) {
    const handleChange = (event) => {
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(event);
    };
    const [value, setValue] = useState("");
    const getValue = (val) => {
        // if (app.getCookie("lang", "en") === "en") return val;
        // if (val.slice(0, 8) === "&#x200F;") return val;
        // else return `&#x200F;${val}`;
        return val
    };
    useEffect(() => {
        setValue(getValue(props.Value));
    }, [props.Value]);
    return (
        <div className={props.ContainerClass}>
            <label className={props.LabelClass}>{app.translate("phonenumber")}</label>
            <ReactPhoneInput
                country={props.Country}
                value={props.Value}
                onChange={handleChange}
                inputClass={`shadow-sm ${app.getCookie("lang", "en") === "en" ? "ps-5" : "pe-5"}  ${props.Class}`}
            />
        </div>
    );
}

PhoneInput.propTypes = {
    OnChange: PropTypes.func,
    Value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    Label: PropTypes.string,
    Country: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Class: PropTypes.string,
    ContainerClass: PropTypes.string,
    LabelClass: PropTypes.string,
    Size: PropTypes.string,
    Type: PropTypes.string,
    Disabled: PropTypes.bool,
    ReadOnly: PropTypes.bool,
};
PhoneInput.defaultProps = {
    Class: "shadow-sm",
    Country: "ar",
    Value: "Value",
    ContainerClass: "my-2",
    LabelClass: "my-2",
    Placeholder: "",
    Size: "",
    Type: "",
    Disabled: false,
    ReadOnly: false,
};
