import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import * as Constants from "../../Utils/constants";
import * as app from "../../Services/app";
import * as helpers from "../../Utils/helpers";
import {GetPropertyById} from "../../Features/Property/Details/middleware";
import {Carousel, GoogleMap, Input, PropertyCard} from "../../Components";
import {Row, Col, Image, Card} from "react-bootstrap";
import responseModel from "../../Features/Property/Details/models/response";
import {HiLocationMarker} from "react-icons/hi";
import {TbCategory, TbBed, TbBath, TbChartAreaLine} from "react-icons/tb";
import {GiBedLamp} from "react-icons/gi";
import {FaRuler} from "react-icons/fa";

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
            <Card className="bg-white shadow border-0">
                <Row className="justify-content-center ">
                    <Image
                        height={150}
                        src={imgSrc}
                        className=" border border-5 col-auto mt-4 border-white rounded-5 "
                    />
                </Row>
                <Row className="text-center">
                    <h5 className="fw-bold">{fullName}</h5>
                    <h6 className="text-gray">{job}</h6>
                </Row>
                <Row className="px-3">
                    <Input Class="text-center border-0 bg-light text-primary fw-bold" Disabled Value={phone} />
                </Row>
            </Card>
        );
    };

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
                                    alt: "Image",
                                };
                            }),
                        ]}
                        VideoUrl={propertyModel.proprety.linkurl}
                    />
                </Row>
                <Row className="pt-3 justify-content-between">
                    <Col>
                        <h3 className="fw-bold text-break ">{propertyModel.proprety.title}</h3>
                    </Col>
                    <Col className="text-end ">
                        <h3 className="fw-bold text-primary ">{propertyModel.proprety.price}</h3>
                    </Col>
                </Row>
                <Row className="justify-content-between px-2">
                    <Col>
                        <h5 className="text-break text-gray">
                            <HiLocationMarker className="" />
                            {propertyModel.proprety.address}
                        </h5>
                    </Col>
                    <Col className="text-end ">
                        <div className="text-break fs-6 text-gray fw-bold">
                            {`${app.translate("postedin")}: ${helpers.ToDateWithTime(
                                propertyModel.proprety.created_at
                            )}`}
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <h3 className="fw-bold my-3">{app.translate("discription")}</h3>
                    <div className="px-3">{propertyModel.proprety.description}</div>
                </Row>
                <hr />
                <h3 className="fw-bold my-3">{app.translate("productdetails")}</h3>
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
                <h3 className="fw-bold my-3">{app.translate("location")}</h3>
                <Row>
                    <GoogleMap />
                </Row>
                <h3 className="fw-bold my-3">{app.translate("recommendedforyou")}</h3>
                <Row md={4}>
                    <PropertyCard Title="Test" />
                    <PropertyCard Title="Test" />
                    <PropertyCard Title="Test" />
                </Row>
            </Col>
            <Col md={3} className="m-1 ">
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
