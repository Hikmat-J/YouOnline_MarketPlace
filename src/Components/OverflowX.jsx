import React from "react";
import {useRef} from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {Row} from "react-bootstrap";

export default function OverflowX(props) {
    const ref = useRef(null);
    return (
        <Row sm={1} className={` h-100 scrolling-wrapper  ${props.ContainerClass}`} ref={ref} style={{zIndex: 10}}>
            <div
                className="col-1 position-absolute align-self-center text-start "
                style={{zIndex: 100, opacity: 0.8,left:50}}
            >
                <Button
                    StartIcon={<AiOutlineLeft />}
                    Class={`shadow-sm  ${props.BtnLeftClass}`}
                    OnClick={() => {
                        ref.current.scrollLeft += -100;
                    }}
                />
            </div>
            {props.children}
            <div
                className="col-1 position-absolute align-self-center text-end"
                style={{zIndex: 100, opacity: 0.8,right:50}}
            >
                <Button
                    StartIcon={<AiOutlineRight />}
                    Class={`shadow-sm  ${props.BtnRightClass}`}
                    OnClick={() => {
                        ref.current.scrollLeft += 100;
                    }}
                />
            </div>
        </Row>
    );
}

OverflowX.propTypes = {
    ContainerClass: PropTypes.string,
    BtnLeftClass: PropTypes.string,
    BtnRightClass: PropTypes.string,
};
OverflowX.defaultProps = {
    ContainerClass: "overflow-hidden row-cols-md-4",
    BtnLeftClass: "btn-primary text-light ",
    BtnRightClass: "btn-primary text-light ",
};
