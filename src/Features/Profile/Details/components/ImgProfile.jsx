import React, { useState, useRef } from "react";
import { Card, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsImage, BsCamera } from "react-icons/bs";
import * as Constants from "../../../../Utils/constants";
import * as app from '../../../../Services/app'
import { UpdateImage } from "../middleware";

export default function ImgProfile_Card(props) {
    const imageRef = useRef(null);
    const bg_imageRef = useRef(null);
    const dispatch = useDispatch();
    const showUploadImg = () => imageRef.current.click();
    const showUploadBgImg = () => bg_imageRef.current.click();
    let lang = app.getCookie("lang", "en");

    function UploadProfileImage(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        dispatch(UpdateImage({ profile_image: file }));
    }

    function UploadBackgroundImage(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        dispatch(UpdateImage({ bg_image: file }));
    }
    return (
        <>
            <Card className="p-0">
                <input
                    id="profile_image"
                    type="file"
                    ref={bg_imageRef}
                    style={{ display: "none" }}
                    onChange={UploadProfileImage}
                />

                <input
                    id="bg_image"
                    type="file"
                    ref={imageRef}
                    style={{ display: "none" }}
                    onChange={UploadBackgroundImage}
                />

                <Card.Img height={230} variant="top" src={Constants.BASE_SITE_URL + props.Profile.bg_image} />

                <Image
                    className="rounded rounded-circle position-absolute "
                    style={{ bottom: 0, top: 180 }}
                    src={Constants.BASE_SITE_URL + "" + props.Profile.profile_image}
                    roundedCircle
                    width={85}
                    height={85}
                />

                <div>
                    <BsImage
                        style={lang === 'ar' ? { width: 35, height: 35, left: 25, bottom: 15, cursor: "pointer" } : { width: 35, height: 35, right: 25, bottom: 15, cursor: "pointer" }}
                        onClick={showUploadImg}
                        className="position-absolute bg-primary rounded rounded-circle p-1 border border-2 border-light text-light "
                    />
                </div>

                <div>
                    <BsCamera
                        style={lang === 'ar' ? { width: 25, height: 25, right: 65, cursor: "pointer" } : { width: 25, height: 25, left: 65, cursor: "pointer" }}
                        onClick={showUploadBgImg}
                        className="position-absolute bg-primary rounded rounded-circle p-1 border border-2 border-light text-light "
                    />
                </div>
            </Card>
        </>
    );
}
