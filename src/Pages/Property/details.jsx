import React, {useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import * as Constants from "../../Utils/constants";
import * as app from "../../Services/app";
import * as helpers from "../../Utils/helpers";
import {GetPropertyById} from "../../Features/Property/Details/middleware";
import {Carousel, Checkbox, GoogleMap, Input, PropertyCard} from "../../Components";
import {Row, Col, Image, Card, Spinner, Placeholder, Tooltip, OverlayTrigger} from "react-bootstrap";
import responseModel from "../../Features/Property/Details/models/response";
import {HiLocationMarker} from "react-icons/hi";
import {TbCategory, TbBed, TbBath, TbChartAreaLine} from "react-icons/tb";
import {GiBedLamp} from "react-icons/gi";
import {FaRuler} from "react-icons/fa";
import {IoIosClock} from "react-icons/io";

export default function PropertyDetails(props) {
    const params = useParams();

    const [propertyModel, setPropertyModel] = useState({
        ...responseModel,
    });
    const profileSelector = useSelector((state) => state.Profile);

    async function GetPropertyAPI(id) {
        let response = await GetPropertyById(id);
        setPropertyModel({proprety: response});
    }

    const ProfileCard = ({imgSrc, fullName, job, phone}) => {
        return (
            <Card className="bg-white shadow border-0 d-none d-lg-block ">
                <Row className="justify-content-center ">
                    {imgSrc.trim() === "" ? (
                        <Placeholder bg="#d2d9d4" as="p" style={{height: 150}} size="lg" animation="wave">
                            <Placeholder bg="#d2d9d4" xs={12} className="h-100" />
                        </Placeholder>
                    ) : (
                        <Image
                            height={150}
                            src={imgSrc}
                            className=" border border-5 col-auto mt-4 border-white rounded-5 "
                        />
                    )}
                </Row>
                <Row className="text-center">
                    <h5 className="fw-bold">
                        {fullName.trim() === "" ? (
                            <Placeholder bg="#d2d9d4" as={"p"} animation="glow" className="text-center">
                                <Placeholder bg="#d2d9d4" xs={4} />
                            </Placeholder>
                        ) : (
                            fullName
                        )}
                    </h5>
                    <h6 className="text-gray">{job}</h6>
                </Row>
                <Row className="px-3">
                    <Input Class="text-center border-0 bg-light text-primary fw-bold" Disabled Value={phone} />
                </Row>
            </Card>
        );
    };

    const profileImg = (imgSrc, fullName, phone) => {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                {fullName}
                <br />
                {phone}
            </Tooltip>
        );
        return (
            <div className="d-md-none">
                <OverlayTrigger placement="left" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
                    <img src={imgSrc} height="40" width="45" alt="profile image" style={{borderRadius: "50%"}} />
                </OverlayTrigger>
            </div>
        );
    };

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        if (params.id > 0) {
            GetPropertyAPI(params.id);
        }
    }, [params.id]);
    return (
        <Row className="px-5">
            <Col md={8} className="m-1">
                <Row>
                    <Carousel
                        Items={[
                            ...propertyModel.proprety.proprety_image.map((img) => {
                                return {
                                    src: img.proprety_image,
                                    alt: <Spinner animation="glow" />,
                                };
                            }),
                        ]}
                        VideoUrl={propertyModel.proprety.linkurl}
                    />
                </Row>
                <Row className="pt-3 justify-content-between">
                    <Col>
                        <h3 className="fw-bold text-break pt-2">
                            {propertyModel.proprety.uid.profile_image.trim() === "" ? (
                                <Placeholder bg="#d2d9d4" as={"p"} animation="glow" className="text-start">
                                    <Placeholder bg="#d2d9d4" xs={6} />
                                </Placeholder>
                            ) : (
                                propertyModel.proprety.title
                            )}
                        </h3>
                    </Col>
                    <Col className="text-end ">
                        <h3 className="fw-bold text-primary ">
                            {propertyModel.proprety.uid.profile_image.trim() === "" ? (
                                <Placeholder bg="#d2d9d4" as={"p"} animation="glow" className="text-end">
                                    <Placeholder bg="#d2d9d4" xs={4} />
                                </Placeholder>
                            ) : (
                                propertyModel.proprety.price
                            )}
                        </h3>
                        <h5 className="text-break text-gray fw-bold">
                            <IoIosClock className="h5 m-1 mb-2" />
                            {propertyModel.proprety.uid.profile_image.trim() === "" ? (
                                <Placeholder bg="#d2d9d4" as={"p"} animation="glow" className="text-end">
                                    <Placeholder bg="#d2d9d4" xs={3} />
                                </Placeholder>
                            ) : (
                                `${helpers.DateToTime(propertyModel.proprety.created_at)}`
                            )}
                        </h5>
                    </Col>
                </Row>
                <Row className="justify-content-between px-2">
                    <Col style={{height: 40}}>
                        <h5 className="text-break text-gray h-100 d-flex align-items-center">
                            <HiLocationMarker />
                            {propertyModel.proprety.country.country} - {propertyModel.proprety.state.state} -{" "}
                            {propertyModel.proprety.city.city} - {propertyModel.proprety.address}
                        </h5>
                    </Col>
                    <Col className="text-end px-1">
                        {profileImg(
                            propertyModel.proprety.uid.profile_image,
                            propertyModel.proprety.uid.fullname
                            // propertyModel.proprety.uid.phone
                        )}
                    </Col>
                </Row>

                <hr />

                <Row>
                    <h3 className="fw-bold my-3">{app.translate("discription")}</h3>
                    <div className="px-3" dangerouslySetInnerHTML={{__html: propertyModel.proprety.description}}></div>
                </Row>

                <hr />

                <h3 className="fw-bold my-3">{app.translate("productdetails")}</h3>
                <Row className="my-4 text-gray ">
                    <h5 className="col fw-bold">{`${propertyModel.proprety.category.name} - ${propertyModel.proprety.subcategory.name}`}</h5>
                </Row>

                <Row md={4}>
                    <div className="m-1">
                        <Row>
                            <Col className="bg-light rounded-5 shadow-sm col-auto">
                                <TbCategory className="h-100 text-primary fs-1" />
                                <p></p>
                            </Col>

                            <Col>
                                <h5 className="fw-bold">{app.translate("type")}</h5>
                                <p>{propertyModel.proprety.prop_type}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="m-1">
                        <Row>
                            <Col className="bg-light rounded-5 shadow-sm col-auto">
                                <TbBed className="h-100 text-primary fs-1" />
                                <p></p>
                            </Col>

                            <Col>
                                <h5 className="fw-bold">{app.translate("bedroom")}</h5>
                                <p>{propertyModel.proprety.bedrooms}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="m-1">
                        <Row>
                            <Col className="bg-light rounded-5 shadow-sm col-auto">
                                <TbBath className="h-100 text-primary fs-1" />
                                <p></p>
                            </Col>

                            <Col>
                                <h5 className="fw-bold">{app.translate("bathroom")}</h5>
                                <p>{propertyModel.proprety.baths}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="m-1">
                        <Row>
                            <Col className="bg-light rounded-5 shadow-sm col-auto">
                                <FaRuler className="h-100 text-primary fs-1" />
                                <p></p>
                            </Col>

                            <Col>
                                <h5 className="fw-bold">{app.translate("areaunit")}</h5>
                                <p>{propertyModel.proprety.areaunit}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="m-1">
                        <Row>
                            <Col className="bg-light rounded-5 shadow-sm col-auto">
                                <TbChartAreaLine className="h-100 text-primary fs-1" />
                                <p></p>
                            </Col>

                            <Col>
                                <h5 className="fw-bold">{app.translate("area")}</h5>
                                <p>{propertyModel.proprety.area}</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="m-1">
                        <Row>
                            <Col className="bg-light rounded-5 shadow-sm col-auto">
                                <GiBedLamp className="h-100 text-primary fs-1" />
                                <p></p>
                            </Col>

                            <Col>
                                <h5 className="fw-bold">{app.translate("furnished")}</h5>
                                <p>{propertyModel.proprety.furnished ? "Yes" : "No"}</p>
                            </Col>
                        </Row>
                    </div>
                </Row>

                <Row className="m-2 py-4 bg-light rounded-3 row-cols-auto row-cols-md-5 ">
                    <Checkbox Id="check1" Class="m-1" Label="balcony" Value={propertyModel.proprety.balcony} ReadOnly />
                    <Checkbox Id="check2" Class="m-1" Label="gym" Value={propertyModel.proprety.gym} ReadOnly />
                    <Checkbox Id="check3" Class="m-1" Label="cinema" Value={propertyModel.proprety.cinema} ReadOnly />
                    <Checkbox
                        Id="check4"
                        Class="m-1"
                        Label="livingroom"
                        Value={propertyModel.proprety.living_room}
                        ReadOnly
                    />
                    <Checkbox Id="check5" Class="m-1" Label="lift" Value={propertyModel.proprety.lift} ReadOnly />
                    <Checkbox Id="check6" Class="m-1" Label="parking" Value={propertyModel.proprety.parking} ReadOnly />
                    <Checkbox Id="check7" Class="m-1" Label="storage" Value={propertyModel.proprety.storage} ReadOnly />
                    <Checkbox
                        Id="check8"
                        Class="m-1"
                        Label="conference"
                        Value={propertyModel.proprety.conference}
                        ReadOnly
                    />
                    <Checkbox
                        Id="check9"
                        Class="m-1"
                        Label="swimmingpool"
                        Value={propertyModel.proprety.swimming_poll}
                        ReadOnly
                    />
                    <Checkbox
                        Id="check9"
                        Class="m-1"
                        Label="maidroom"
                        Value={propertyModel.proprety.maid_room}
                        ReadOnly
                    />
                    <Checkbox Id="check10" Class="m-1" Label="sports" Value={propertyModel.proprety.sports} ReadOnly />
                </Row>

                <h3 className="fw-bold my-3">{app.translate("location")}</h3>

                <Row>
                    <GoogleMap />
                </Row>

                <h3 className="fw-bold my-3 mt-5">{app.translate("recommendedforyou")}</h3>
                <Row xs={1} sm={2} md={4}>
                    <PropertyCard ContainerClass="my-2" Title="Test" />
                    <PropertyCard ContainerClass="my-2" Title="Test" />
                    <PropertyCard Title="Test" ContainerClass="my-2" />
                </Row>
            </Col>
            <Col md={3} className="m-1">
                <ProfileCard
                    imgSrc={propertyModel.proprety.uid.profile_image}
                    fullName={propertyModel.proprety.uid.fullname}
                    job={"Job"}
                    phone={"phoneNumber"}
                />
            </Col>
        </Row>
    );
}
