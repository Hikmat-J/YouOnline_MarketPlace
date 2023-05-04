import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
export default function ImageUpload(props) {
    let initModel = {
        ControlShow: false,
    }
    const [state, setState] = useState(initModel);
    const ResetValue = useRef(null);
    function readURL(event) {
        var input = event.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (props.OnChange && typeof (props.OnChange) == "function")
                    props.OnChange(e.target.result.split("base64,")[1], input.files[0].name.split("."))
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            removeUpload();
        }
    }

    function removeUpload(event) {
        if (props.RemoveCilcked && typeof (props.RemoveCilcked) == "function") {
            props.RemoveCilcked(event);
            setState(old => ({ ...old, ImageSrc: "#", ControlShow: false }))
        }
    }

    function Uploadhandler(event) {
        if (props.UploadCilcked && typeof (props.UploadCilcked) == "function") {
            setState((old) => ({ ...old, ControlShow: true }))
            props.UploadCilcked(event);
        }
    }
    return (
        <div className="row">
            <div className="col-6">
                <div className='card bg-body card-primary text-start' >
                    <div className=" w-25 mx-4 mt-2">
                        <img className="card-img-top rounded " src={props.Model} alt="" id={"file-upload-image" + props.Title} />
                    </div>
                    <div id={"image-upload-wrap" + props.Title}>
                        <input ref={ResetValue} className="form-control mt-2 form-control-sm w-75 ms-4" id={"file-upload-input" + props.Title} type='file' onChange={readURL} accept="image/*" />
                    </div>
                    <div className="card-body">
                        <Button Clicked={Uploadhandler} Label={'UPLOAD'} Class={`btn btn-info rounded-3 mx-2 mt-2 text-white`} />
                        {state.ControlShow && <Button Clicked={removeUpload} Label={'REMOVE AVATAR'} Class={`btn btn-secondary rounded-3 mx-1 mt-2 text-white`} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
ImageUpload.propTypes = {
    Model: PropTypes.string,
    OnChange: PropTypes.func.isRequired,
    Title: PropTypes.string,
    UploadCilcked: PropTypes.func,
    RemoveCilcked: PropTypes.func,
};

ImageUpload.defaultProps = {
    Model: "",
    Title: "",
};  