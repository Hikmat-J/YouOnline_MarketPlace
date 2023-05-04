import React from "react";
import Alert from "react-bootstrap/Alert";
// import parse from "html-react-parser";
import PropTypes from "prop-types";
import {translate} from "../../Services/app";

export default function MessageAlert(props) {
    function onCloseHandler() {
        if (props.Close && typeof props.Close == "function") props.Close();
    }

    return (
        props.Show && (
            <Alert
                className={`position-fixed opacity-75 mt-0 rounded-0 top-0 start-0 end-0 ${props.Class}`}
                style={{zIndex: "9999", height: "50px"}}
                onClose={onCloseHandler}
                dismissible
            >
                <p className="text-center fw-normal text-light h-auto mb-3" style={{fontSize: "0.75em"}}>
                    {translate(props.Message)}
                </p>
            </Alert>
        )
    );
}

MessageAlert.prototype = {
    Show: PropTypes.bool,
    Class: PropTypes.string,
    Link: PropTypes.string,
    Message: PropTypes.string,
    Close: PropTypes.func,
};
MessageAlert.defaultProps = {
    Show: false,
    Link: "",
    Message: "",
    Class: "",
};
