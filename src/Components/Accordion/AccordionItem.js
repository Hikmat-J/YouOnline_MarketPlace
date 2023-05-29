import React from "react";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import {Accordion} from "react-bootstrap";

function AccordionItem(props) {
    function handleClick(event) {
        if (props.OnClick && typeof props.OnClick === "function") props.OnClick(event);
    }

    return (
        // <div className="accordion-item my-2">
        //     <h2 className="accordion-header " id="headingOne">
        //         <button
        //             style={{ "height": "35px" }}
        //             className={`accordion-button bg-primary rounded rounded-2`}
        //             type="button" data-bs-toggle="collapse"
        //             data-bs-target={`#${props.Title}`}
        //             aria-expanded="true"
        //             aria-controls="collapseOne"
        //             onClick={props.Clicked}
        //             disabled={props.Disabled}>
        //             <div className={'border-0 border-end border-dark text-start me-2 border-white'} style={{ width: "0.7cm",height:"35px",lineHeight:"35px" }}><span className={props.Disabled ? 'text-white' : 'text-dark'}>{1}</span></div>
        //             <span className={props.Disabled ? 'text-white' : 'text-dark'}>{app.translate(props.Title)}</span>
        //         </button>
        //     </h2>
        //     <div id={props.Title} className={`accordion-collapse collapse  ${props.Show ? "show" : ""}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        //         <div className="accordion-body bg-white">
        //             {props.children}
        //         </div>
        //     </div>
        // </div>

        <>
            <Accordion.Item className={props.Class} eventKey={props.eventKey} onClick={handleClick}>
                <Accordion.Header>{props.Header}</Accordion.Header>
                <Accordion.Body>{props.children}</Accordion.Body>
            </Accordion.Item>
        </>
    );
}
AccordionItem.propTypes = {
    Class: PropTypes.string,
    OnClick: PropTypes.func,
    eventKey: PropTypes.string,
    Header: PropTypes.string,
};
AccordionItem.defaultProps = {
    Class: "w-100 mx-0 px-0",
    eventKey: "0",
    Header: "",
};

export default AccordionItem;
