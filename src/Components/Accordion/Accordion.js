import React from "react";
import PropTypes from "prop-types";
import {Accordion as RBAccordion} from "react-bootstrap";
function Accordion(props) {
    return (
        <>
            <RBAccordion >{props.children}</RBAccordion>
        </>
    );
}

Accordion.propTypes = {
    Class: PropTypes.string,
    Disabled: PropTypes.bool,
};
Accordion.defaultProps = {
    Class: " ",
    Disabled: false,
};

export default Accordion;
