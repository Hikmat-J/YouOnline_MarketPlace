import React, {useEffect, useRef, useState} from "react";
import {Row, Col, Image} from "react-bootstrap";
import * as app from "../../Services/app";
import * as Constants from "../../Utils/constants";
import PropTypes from "prop-types";
import {IoIosImages} from "react-icons/io";
import {MdAdd, MdCancel} from "react-icons/md";

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
    const addOneImageRef = useRef(null);

    const showUploadImages = () => imageRef.current.click();
    const showUploadImage = () => addOneImageRef.current.click();

    function OnReadImages(event) {
        event.stopPropagation();
        event.preventDefault();
        var files = Array.from(event.target.files);
        setImages(files);
        if (props.OnReadImages && typeof props.OnReadImages === "function") props.OnReadImages(files, event);
    }
    function OnAddImage(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        setImages((old) => [...old, file]);
        if (props.OnAddImage && typeof props.OnAddImage === "function") props.OnAddImage(file, event);
    }
    function removeImage(imgFile) {
        var tempImages = [...images];
        tempImages = tempImages.filter((img) => img !== imgFile);
        setImages(tempImages);
        if (props.OnReadImages && typeof props.OnReadImages === "function") props.OnReadImages(tempImages);
    }

    useEffect(() => {
        console.log('props.Images :>> ', props.Images);
        if (Array.isArray(props.Images) && props.Images.length > 0) {
            setImages(props.Images);
        }
    }, []);
    return (
        <>
            <Row
                className="text-center  align-items-center m-4 text-gray rounded-4 border-dotted border-lightGrey border-1"
                style={{minHeight: 200, cursor: "pointer", width: 500}}
                onClick={showUploadImages}
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
                <h2 className="text-gray">{app.translate("clicktouploadimages")}</h2>
                <h5 className="fw-bold">({app.translate("required")})</h5>
            </Row>
            <Row className="row-cols-auto m-4">
                {images.map((img) => {
                    return (
                        <>
                            <Col className="position-relative m-1 my-3 ">
                                <MdCancel
                                    className="text-danger bg-light rounded-5 position-absolute start-0  "
                                    style={{top: -10, cursor: "pointer", zIndex: 20}}
                                    size={25}
                                    onClick={() => removeImage(img)}
                                />
                                <Image
                                    style={{zIndex: 10}}
                                    src={URL.createObjectURL(img)}
                                    width={75}
                                    height={75}
                                    rounded
                                />
                            </Col>
                        </>
                    );
                })}
                <input
                    className="d-none"
                    id="image1"
                    type="file"
                    ref={addOneImageRef}
                    accept="image/*"
                    onChange={OnAddImage}
                />
                {images.length > 0 && (
                    <>
                        <Col className="m-1 py-3">
                            <MdAdd
                                style={{cursor: "pointer"}}
                                className="text-gray rounded-4 border-dotted border-lightGrey border-1"
                                size={60}
                                onClick={showUploadImage}
                            />
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
    // }
}

UploadImages.propTypes = {
    OnReadImages: PropTypes.func.isRequired,
    OnAddImage: PropTypes.func,
    Images: PropTypes.array.isRequired,
    Title: PropTypes.string,
};

UploadImages.defaultProps = {
    Model: "",
    Title: "",
};
