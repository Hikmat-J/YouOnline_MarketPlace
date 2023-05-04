import React, {useEffect, useRef, useState} from "react";
import {Row, Col, Image} from "react-bootstrap";
import * as app from "../Services/app";
import PropTypes from "prop-types";
import {IoIosImages} from "react-icons/io";
import {MdCancel} from "react-icons/md";

export default function UploadImages(props) {
    // if (props.DisplayAsButton) {
    //     return (
    //         <div className="row">
    //             <div className="col-12 d-flex align-items-center gap-2">
    //                 <label className="w-auto form-control" htmlFor={"file-upload-input" + props.Title}>
    //                     {app.translate(props.Title)}
    //                     <span className="iconssc-cloud ms-2"></span>
    //                 </label>
    //                 <input
    //                     className="d-none"
    //                     id={"file-upload-input" + props.Title}
    //                     type="file"
    //                     onChange={readURL}
    //                     accept="image/*"
    //                 />
    //                 <span id="fileChosen" className="col-auto"></span>
    //             </div>
    //         </div>
    //     );
    // } else {

    const [images, setImages] = useState([]);
    const imageRef = useRef(null);

    const showUploadImgs = () => imageRef.current.click();

    function OnReadImages(event) {
        event.stopPropagation();
        event.preventDefault();
        var files = Array.from(event.target.files);
        setImages(files);
        if (props.OnReadImages && typeof props.OnReadImages === "function") props.OnReadImages(files, event);
    }

    function removeImage(imgFile) {
        var tempImages = [...images];
        tempImages = tempImages.filter((img) => img !== imgFile);
        setImages(tempImages);
        if (props.OnReadImages && typeof props.OnReadImages === "function") props.OnReadImages(tempImages);
    }
    return (
        <>
            <Row
                className="text-center align-items-center m-4 text-gray rounded-4 border-dotted border-lightGrey border-1"
                style={{minHeight: 200, cursor: "pointer"}}
                onClick={showUploadImgs}
            >
                <input
                    className="d-none"
                    multiple={props.IsMultiple}
                    id="image"
                    type="file"
                    ref={imageRef}
                    accept="image/*"
                    onChange={OnReadImages}
                />
                <IoIosImages size={75} />
                <h2 className="text-gray">{app.translate("uploadimagetext")}</h2>
            </Row>
            <Row className="row-cols-auto m-4">
                {images.map((img) => {
                    return (
                        <>
                            <Col className="position-relative">
                                <MdCancel
                                    className="text-danger bg-light rounded-5 position-absolute start-0  "
                                    style={{top: -10, cursor: "pointer",zIndex:20}}
                                    size={25}
                                    onClick={() => removeImage(img)}
                                />
                                <Image style={{zIndex:10}} src={URL.createObjectURL(img)} width={75} height={75} rounded />
                            </Col>
                        </>
                    );
                })}
            </Row>
        </>
    );
    // }
}

UploadImages.propTypes = {
    Model: PropTypes.string,
    OnChange: PropTypes.func.isRequired,
    Title: PropTypes.string,
    IsTable: PropTypes.bool,
    DisplayAsButton: PropTypes.bool,
};

UploadImages.defaultProps = {
    Model: "",
    Title: "",
    IsTable: false,
    DisplayAsButton: false,
};
