import React from 'react';
import PropTypes from "prop-types";

function Accordion(props) {

    return (
        <>
            <div className="accordion" id="accordionExample">
                {props.children}
            </div>
        </>
    );
}

Accordion.propTypes = {
    Class: PropTypes.string,
    Disabled: PropTypes.bool
}
Accordion.defaultProps = {
    Class: " ",
    Disabled: false
}

export default Accordion;