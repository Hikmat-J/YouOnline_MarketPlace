import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import Button from "./Button";
export default function ButtonImgUpload(props) {
    const InputRef = useRef(null);
    // function readURL(event) {
    //     var input = event.target;
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             if (props.OnChange && typeof props.OnChange == "function")
    //                 props.OnChange(e.target.result.split("base64,")[1], input.files[0].name.split("."));
    //         };
    //         reader.readAsDataURL(input.files[0]);
    //     } else {
    //         removeUpload();
    //     }
    // }
    // function removeUpload(event) {
    //     if (props.RemoveCilcked && typeof props.RemoveCilcked == "function") {
    //         props.RemoveCilcked(event);
    //         setState((old) => ({...old, ImageSrc: "#", ControlShow: false}));
    //     }
    // }

    // function Uploadhandler(event) {
    //     if (props.UploadCilcked && typeof props.UploadCilcked == "function") {
    //         setState((old) => ({...old, ControlShow: true}));
    //         props.UploadCilcked(event);
    //     }
    // }
    function handleChange() {}

    if (props.GetInputRef && typeof props.GetInputRef === "function") {
        props.GetInputRef(InputRef);
    }

    function OnReadFile(event) {
        if (props.OnReadFile && typeof props.OnReadFile === "function") {
            event.stopPropagation();
            event.preventDefault();
            var file = event.target.files[0];
            props.OnReadFile(file);
        }
    }
    return (
        <>
            <input id="myInput" type="file" ref={InputRef} style={{display: "none"}} onChange={OnReadFile} />
            {props.children}
        </>
    );
}
ButtonImgUpload.propTypes = {
    Model: PropTypes.string,
    OnChange: PropTypes.func.isRequired,
    Title: PropTypes.string,
    UploadCilcked: PropTypes.func,
    RemoveCilcked: PropTypes.func,
};

ButtonImgUpload.defaultProps = {
    Model: "",
    Title: "",
};
