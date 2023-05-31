import {Modal} from "react-bootstrap";
import Button from "./Button";
import * as app from "../Services/app";
import React from "react";
import PropTypes from "prop-types";

function Dialog(props) {
    function Close() {
        if (props.OnClose && typeof props.OnClose === "function") props.OnClose();
    }

    function Ok() {
        console.log("typeof props.Ok :>> ", typeof props.Ok);
        if (props.Ok && typeof props.Ok === "function") props.Ok();
    }

    function Clicked(clicked) {
        if (clicked && typeof clicked === "function") clicked();
    }

    return (
        <Modal
            fullscreen={props.FullScreen}
            className={props.Class}
            show={props.Show}
            size={props.Size}
            onHide={Close}
            style={{
                direction: app.getCookie("Lang", "en") == "ar" ? "rtl" : "ltr",
            }}
        >
            <Modal.Header
                closeButton={props.OnClose ? true : false}
                onClick={Close}
                className={`p-2 ${props.HeaderClass}`}
            >
                <Modal.Title className="w-100">{app.translate(props.Title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-2 text-start">{props.children}</Modal.Body>
            <Modal.Footer className="p-1">
                {props.WithBtnClose && (
                    <Button Class="btn btn-outline-primary w-auto" OnClick={Close} Label={props.CloseLabel} />
                )}
                {props.Ok && (
                    <Button Class={`btn btn-outline-${props.OkVariant} w-auto`} OnClick={Ok} Label={props.OkLabel} />
                )}
                {props.OtherButtons &&
                    props.OtherButtons.map((item) => {
                        return (
                            <Button
                                show={false}
                                Class={item.Class}
                                Clicked={() => Clicked(item.Clicked)}
                                Label={item.Label}
                            />
                        );
                    })}
            </Modal.Footer>
        </Modal>
    );
}

Dialog.propTypes = {
    OnClose: PropTypes.func,
    Ok: PropTypes.func,
    Title: PropTypes.string,
    Show: PropTypes.bool,
    CloseLabel: PropTypes.string,
    OkLabel: PropTypes.string,
    Class: PropTypes.string,
    Width: PropTypes.string,
    Height: PropTypes.string,
    FullScreen: PropTypes.bool,
    WithBtnClose: PropTypes.bool,
    HeaderClass: PropTypes.string,
    OkVariant: PropTypes.string,
};

Dialog.defaultProps = {
    Title: "",
    Show: true,
    CloseLabel: "Close",
    OkLabel: "Ok",
    Size: "sm",
    Class: "",
    FullScreen: false,
    WithBtnClose: false,
    HeaderClass: "",
    OkVariant: "success",
};
export default Dialog;
