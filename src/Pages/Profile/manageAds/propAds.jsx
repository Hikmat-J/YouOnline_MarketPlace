import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectMyProperty} from "../../../Features/Property/MyProperties/slice";
import {Dialog, PropertyCard} from "../../../Components";
import {GetMyProperties} from "../../../Features/Property/MyProperties/middleware";
import * as app from "../../../Services/app";
import {useNavigate} from "react-router-dom";
export default function ManagePropAds(props) {
    const myPropSelector = useSelector((state) => selectMyProperty(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [control, setControl] = useState({Show: false});
    useEffect(() => {
        dispatch(GetMyProperties());
    }, []);
    return (
        <>
            <Row>
                <h3 className="fw-bold">{app.translate("manageyourads")}</h3>
            </Row>
            <Row sm={2} lg={3} xxl={4}>
                {myPropSelector.status !== "succeeded" ? (
                    [0, 1, 2, 3, 4, 5].map((cat, index) => {
                        return (
                            <Col key={index}>
                                <PropertyCard ShowSkeleton />
                            </Col>
                        );
                    })
                ) : (
                    <>
                        {myPropSelector.data.Proprety &&
                            myPropSelector.data.Proprety.length > 0 &&
                            myPropSelector.data.Proprety.map((item, index) => {
                                return (
                                    <Col>
                                        <PropertyCard
                                            WithNavigateToDetailsPage={false}
                                            ImgClicked={() => {
                                                navigate("/Property/Edit/" + item.id);
                                            }}
                                            Tooltip="edit"
                                            Beds={item.beds}
                                            Bath={item.baths}
                                            Space={item.area}
                                            PropType={item.prop_type}
                                            PropertyId={item.id}
                                            SubTitle="0 Ads"
                                            ImgSrc={item.proprety_image[0].proprety_image}
                                            Title={item.title}
                                            footerText="text"
                                            Country={item.country}
                                            City={item.city}
                                            State={item.state}
                                            Price={item.price}
                                            Id={item.id}
                                            fav={item.proprety_fav === 1}
                                        />
                                    </Col>
                                );
                            })}
                    </>
                )}
            </Row>
        </>
    );
}
