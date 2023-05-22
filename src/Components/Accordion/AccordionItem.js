import React from 'react';
import PropTypes from "prop-types";
import * as app from "../../Services/app";

function AccordionItem(props) {
    return (
        <div className="accordion-item my-2">
            <h2 className="accordion-header" id="headingOne">
                <button
                    style={{ "height": "35px" }}
                    className={`accordion-button bg-primary rounded rounded-2`}
                    type="button" data-bs-toggle="collapse"
                    data-bs-target={`#${props.Title}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={props.Clicked}
                    disabled={props.Disabled}>
                    <div className={'border-0 border-end border-dark text-start me-2 border-white'} style={{ width: "0.7cm",height:"35px",lineHeight:"35px" }}><span className={props.Disabled ? 'text-white' : 'text-dark'}>{1}</span></div>
                    <span className={props.Disabled ? 'text-white' : 'text-dark'}>{app.translate(props.Title)}</span>
                </button>
            </h2>
            <div id={props.Title} className={`accordion-collapse collapse  ${props.Show ? "show" : ""}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body bg-white">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
AccordionItem.propTypes = {
    Class: PropTypes.string,
    Disabled: PropTypes.bool,
    Title: PropTypes.string,
    Clicked:PropTypes.func,
    Show: PropTypes.bool
}
AccordionItem.defaultProps = {
    Class: " ",
    Disabled: false,
    Show: false
}

export default AccordionItem;