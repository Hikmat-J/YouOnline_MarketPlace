import React, {useState, useEffect} from "react";
import {useRef} from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {Row} from "react-bootstrap";

export default function OverflowX(props) {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);

    const ref = useRef(null);
    return (
        <Row
            className={` h-100 row-cols-auto ${
                screenSize.width <= 768 ? "overflow-scroll scrolling-wrapper" : "scrolling-wrapper"
            }  ${props.ContainerClass}`}
            ref={ref}
            style={{zIndex: 10, scrollBehavior: "smooth"}}
        >
            <div
                className="col-1 position-absolute align-self-center text-start "
                style={{zIndex: 2, opacity: 0.8, left: 50}}
            >
                {screenSize.width > 768 && (
                    <Button
                        StartIcon={<AiOutlineLeft />}
                        Class={`shadow-sm  ${props.BtnLeftClass}`}
                        OnClick={() => {
                            ref.current.scrollLeft += -350;
                        }}
                    />
                )}
            </div>
            {props.children}
            <div
                className="col-1 position-absolute align-self-center text-end"
                style={{zIndex: 2, opacity: 0.8, right: 50}}
            >
                {screenSize.width > 768 && (
                    <Button
                        StartIcon={<AiOutlineRight />}
                        Class={`shadow-sm  ${props.BtnRightClass}`}
                        OnClick={() => {
                            ref.current.scrollLeft += 350;
                        }}
                    />
                )}
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
