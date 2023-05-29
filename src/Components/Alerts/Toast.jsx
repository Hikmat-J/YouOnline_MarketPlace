import Toast from "react-bootstrap/Toast";
import * as helpers from "../../Utils/helpers";
import * as app from "../../Services/app";
import PropTypes from "prop-types";

export default function ToastAlert(props) {
    function onCloseHandler() {
        if (props.Close && typeof props.Close == "function") props.Close();
    }
    const lang = app.getCookie("lang", "en");
    const time = helpers.getTime();
    return (
        <>
            {props.Show && (
                <Toast
                    style={{zIndex: 999999}}
                    className={
                        `position-fixed ${lang === "en" ? "end-0 me-5" : "start-0 ms-5"} mb-3 bottom-0 ` + props.Class
                    }
                    show={true}
                    bg="light"
                    onClose={onCloseHandler}
                >
                    <Toast.Header className={`bg-${props.messageType} text-light`}>
                        <strong className={app.getCookie("lang", "en") === "en" ? "me-auto" : "ms-auto"}>
                            {app.translate(props.Header)}
                        </strong>
                        <small className="px-2">
                            {app.translate("time")} {time}
                        </small>
                    </Toast.Header>
                    <Toast.Body className={`text-${props.messageType}`}>{props.Body}</Toast.Body>
                </Toast>
            )}
        </>
    );
}

ToastAlert.prototype = {
    Show: PropTypes.bool,
    Class: PropTypes.string,
    Header: PropTypes.string,
    Body: PropTypes.string,
    Close: PropTypes.func,
    messageType: PropTypes.string,
};
ToastAlert.defaultProps = {
    Show: false,
    Header: "message",
    Body: "",
    Class: "",
    messageType: "danger",
};
