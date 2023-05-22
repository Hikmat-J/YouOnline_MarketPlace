import React from "react";
import PropTypes from "prop-types";
import RBDropdown from "react-bootstrap/Dropdown";
import { MdSpaceDashboard } from 'react-icons/md'

import * as app from "../Services/app";
import { Image, Row, Col } from "react-bootstrap";

function Dropdown(props) {
    const handleChange = (eventKey, event) => {
        if (props.OnChange && typeof props.OnChange === "function") props.OnChange(eventKey, props.Options, event);
    };
    return (
        <RBDropdown dir="rtl" onSelect={handleChange} className={props.ContainerClass}>
            <RBDropdown.Toggle disabled={props.Disabled} size={props.Size} variant={props.Variant} id={props.ToggleId}>
                {props.StartIcon && props.StartIcon}
                {props.Label && app.translate(props.Label)}
                {props.EndIcon && props.EndIcon}
                {props.Img && <Image className={props.ImgClass} src={props.ImgSrc} {...props.ImgProps} width={props.ImgWidth} height={props.ImgHeight} />}
            </RBDropdown.Toggle>

            <RBDropdown.Menu className="ms-0 m-2" style={{ width: props.MenuStyleWidth }}>
                {props.Options.length > 0 &&
                    props.Options.map((item, index) => {
                        return (
                            <Row key={index} className="my-2">
                                {item.StartIcon && <Col className="h-100 " xs={1}>{item.StartIcon}</Col>}
                                <Col className="ms-2">
                                    <RBDropdown.Item
                                        className={props.Value === item[props.Key] ? "bg-primary text-light" : ""}
                                        eventKey={item[props.Key]}
                                        key={item[props.Key]}
                                        href={item.Href}
                                    >
                                        {item[props.KeyValue]}
                                    </RBDropdown.Item>
                                </Col>
                            </Row>);
                    })}
            </RBDropdown.Menu>
        </RBDropdown>
    );
}

export default Dropdown;

Dropdown.propTypes = {
    OnChange: PropTypes.func,
    Options: PropTypes.array.isRequired,
    Label: PropTypes.string,
    ContainerClass: PropTypes.string,
    Class: PropTypes.string,
    Variant: PropTypes.string,
    Size: PropTypes.string,
    ToggleId: PropTypes.string,
    Key: PropTypes.string,
    Href: PropTypes.string,
    KeyValue: PropTypes.string,
    Disabled: PropTypes.bool,
    StartIcon: PropTypes.element,
    EndIcon: PropTypes.element,
    Img: PropTypes.bool,
    ImgSrc: PropTypes.string,
    ImgWidth: PropTypes.number,
    ImgHeight: PropTypes.number,
    ImgClass: PropTypes.string,
    MenuStyleWidth: PropTypes.number,
    ImgProps: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.element]),
};
Dropdown.defaultProps = {
    Label: "",
    Class: "",
    ContainerClass: "",
    Variant: "",
    Size: "",
    Key: "Key",
    KeyValue: "Value",
    Disabled: false,
    ToggleId: "dropdown",
    Img: false,
    ImgSrc: '',
    ImgWidth: 25,
    ImgHeight: 25,
    ImgClass: 'me-1',
    ImgProps: '',
    MenuStyleWidth: 200
};
