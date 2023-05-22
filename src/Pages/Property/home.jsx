import React, {useEffect, useState} from "react";
import {Row, Col, Image} from "react-bootstrap";
import * as app from "../../Services/app";
import {IoSearchOutline} from "react-icons/io5";
import {Button, Select, PropertyCard} from "../../Components";
import {useDispatch, useSelector} from "react-redux";
import {GetPropertyByCategory} from "../../Features/Property/GetByCategory/middleware";
import {useNavigate} from "react-router-dom";

export default function Home(props) {
    const [control, setControl] = useState({
        IsRent: false,
        TabSelected: "residential",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const propertyCategoriesSelector = useSelector((state) => state.Property.Categories.data);
    const propertyByCategorySelector = useSelector((state) => state.Property.ByCategoryId.data);
    function SearchHandle() {
        navigate("/Property/Filter", true);
    }
    useEffect(() => {
        dispatch(GetPropertyByCategory(1));
    }, []);
    // useEffect(() => {}, [propertyCategoriesSelector]);
    return (
        <>
            <section className="container">
                    <Row
                    className="flex-fill "
                    style={{background: "linear-gradient(90.33deg, #F9F9F9 -18.35%, #E5F0FA 107.37%)"}}
                >
                    <Col className="align-self-center mx-4 h-100">
                        <Row className="mt-4">
                            <h2>
                                {app.translate("searchfor") + " "}
                                <span className="text-primary ">{app.translate("properties")}</span>
                            </h2>
                        </Row>
                        <Row>
                            <div className="col-auto p-1 m-4 h-50 rounded-5 bg-white border border-2  border-primary">
                                <Button
                                    Class={` rounded-5 m-0 px-4 ${
                                        control.IsRent ? "btn-light text-primary" : "btn-primary text-light"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, IsRent: false}));
                                    }}
                                    Label="buy"
                                />
                                <Button
                                    Class={`rounded-5 m-0 px-4 ${
                                        control.IsRent ? "btn-primary text-light" : "btn-light text-primary"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, IsRent: true}));
                                    }}
                                    Label="rent"
                                />
                            </div>
                        </Row>
                        <Row className="bg-white py-2 pt-0 row-cols-auto shadow-sm rounded">
                            <Col className="p-0">
                                <Button
                                    Label="residential"
                                    Class={`btn-light px-5 rounded-1 ${
                                        control.TabSelected === "residential" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: "residential"}));
                                    }}
                                />
                                {control.TabSelected === "residential" && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                            <Col className="p-0">
                                <Button
                                    Label="commercial"
                                    Class={`btn-light px-5 rounded-1 ${
                                        control.TabSelected === "commercial" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: "commercial"}));
                                    }}
                                />
                                {control.TabSelected === "commercial" && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                            <Col className="p-0">
                                <Button
                                    Label="land"
                                    Class={`btn-light px-5 rounded-1 ${
                                        control.TabSelected === "land" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: "land"}));
                                    }}
                                />
                                {control.TabSelected === "land" && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                            <Col className="p-0">
                                <Button
                                    Label="multipleunits"
                                    Class={`btn-light px-5 mx-0 rounded-1 ${
                                        control.TabSelected === "multipleunits" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: "multipleunits"}));
                                    }}
                                />
                                {control.TabSelected === "multipleunits" && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                        </Row>
                        <Row className="position-absolute bg-white w-65">
                            <Select Options={[]} Label="location" ContainerClass="col m-3 p-0" />
                            <Select Options={[]} Label="propertytype" ContainerClass="col m-3 p-0" />
                            <Select Options={[]} Label="pricerange" ContainerClass="col m-3 p-0" />
                            <Select Options={[]} Label="area" ContainerClass="col m-3 p-0" />
                            <Col className="align-self-center col-auto">
                                <Button
                                    OnClick={SearchHandle}
                                    StartIcon={
                                        <IoSearchOutline className="btn btn-primary text-light fs-1 mt-4 p-2 rounded" />
                                    }
                                />
                            </Col>{" "}
                        </Row>
                    </Col>
                    <Col className="d-none d-lg-block p-0 mx-5 ">
                        <Image src="/bg-propertyHome.png" />
                    </Col>
                </Row>
            </section>

            <section>
                {propertyByCategorySelector.count && propertyByCategorySelector.count > 0 && (
                    <section className="mb-5 container">
                        <Row>
                            <div className="fs-4 fw-bold text-primary  ">
                                {app.translate("mostpopularof") + " " + app.translate("automotive")}
                            </div>
                        </Row>
                        {/* <OverflowX> */}
                        <Row md={4}>
                            {propertyByCategorySelector.proprety &&
                                propertyByCategorySelector.proprety.length > 0 &&
                                propertyByCategorySelector.proprety.map((item, index) => {
                                    return (
                                        <Col>
                                            <PropertyCard
                                                PropertyId={item.id}
                                                SubTitle="0 Ads"
                                                ImgSrc={item.proprety_image[0].proprety_image}
                                                Title={item.title}
                                                footerText="text"
                                                Country={item.country}
                                                City={item.city}
                                                State={item.state}
                                                Price={item.price}
                                            />
                                        </Col>
                                    );
                                })}
                        </Row>
                        <Row className="justify-content-center">
                            <Button Class="btn-primary text-light col-auto" Label="View More" OnClick={() => {}} />
                        </Row>
                        {/* </OverflowX> */}
                    </section>
                )}
            </section>
        </>
    );
}
