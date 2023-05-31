import React, {useEffect, useState} from "react";
import {Row, Col, Image} from "react-bootstrap";
import * as app from "../../Services/app";
import * as Constants from "../../Utils/constants";
import {IoSearchOutline} from "react-icons/io5";
import {Button, Select, CategoryCard, PropertyCard, Input} from "../../Components";
import {useDispatch, useSelector} from "react-redux";
import {GetPropertyByCategory} from "../../Features/Property/GetByCategory/middleware";
import {useNavigate} from "react-router-dom";
import bgPropHome from "../../assets/images/bg-propertyHome.png";
import {selectCities} from "../../Features/Common/Cities/slice";
import {GetCities} from "../../Features/Common/Cities/middleware";
import {Countries, selectCountries} from "../../Features/Common/Countries/slice";
import {GetCountries} from "../../Features/Common/Countries/middleware";
import {GetMyProperties} from "../../Features/Property/MyProperties/middleware";

export default function Home(props) {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const propertyByCategorySelector = useSelector((state) => state.Property.ByCategoryId);
    const CountriesSelector = useSelector((state) => selectCountries(state));

    const [control, setControl] = useState({
        prop_type: "",
        TabSelected: 1,
    });
    const [data, setData] = useState({
        AreaSpaces: [...Constants.AREA_SPACES],
        PriceRanges: [...Constants.PRICE_RANGES],
    });
    const [searchModel, setSearchModel] = useState({
        country: "",
        minprice: "",
        maxprice: "",
        area: "",
        searchkey: "",
    });

    function SearchHandle() {
        navigate("/Property/Filter", true);
    }
    useEffect(() => {
        window.scrollTo(0, 0);

        if (CountriesSelector.status === "idle") {
            dispatch(GetCountries());
        }
        dispatch(GetMyProperties());
    }, []);

    useEffect(() => {
        dispatch(GetPropertyByCategory(control.TabSelected));
    }, [control.TabSelected]);

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
                            <div className="col-auto p-1 my-4 mx-2 h-50 rounded-5 bg-white border border-2  border-primary">
                                <Button
                                    Class={`rounded-5 m-0 px-4 ${
                                        control.prop_type === "" ? "btn-primary text-light" : "btn-light text-primary"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, prop_type: ""}));
                                    }}
                                    Label="all"
                                />{" "}
                                <Button
                                    Class={` rounded-5 m-0 px-4 ${
                                        control.prop_type === "Sael"
                                            ? "btn-primary text-light"
                                            : "btn-light text-primary"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, prop_type: "Sael"}));
                                    }}
                                    Label="buy"
                                />
                                <Button
                                    Class={`rounded-5 m-0 px-4 ${
                                        control.prop_type === "Rent"
                                            ? "btn-primary text-light"
                                            : "btn-light text-primary"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, prop_type: "Rent"}));
                                    }}
                                    Label="rent"
                                />
                            </div>
                        </Row>
                        <Row className="bg-white pb-2 pt-0 shadow-sm rounded">
                            <Col className="p-0 ">
                                <Button
                                    Label="residential"
                                    Class={`btn-light w-100 px-4 rounded-1 ${
                                        control.TabSelected === "residential" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: 1}));
                                        window.scrollTo({top: 700, behavior: "smooth"});
                                    }}
                                />
                                {control.TabSelected === 1 && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                            <Col className="p-0">
                                <Button
                                    Label="commercial"
                                    Class={`btn-light w-100 px-4 rounded-1 ${
                                        control.TabSelected === "commercial" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: 2}));
                                        window.scrollTo({top: 700, behavior: "smooth"});
                                    }}
                                />
                                {control.TabSelected === 2 && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                            <Col className="p-0">
                                <Button
                                    Label="agricultural"
                                    Class={`btn-light w-100 px-4 rounded-1 ${
                                        control.TabSelected === "land" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: 3}));
                                        window.scrollTo({top: 700, behavior: "smooth"});
                                    }}
                                />
                                {control.TabSelected === 3 && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                            <Col className="p-0">
                                <Button
                                    Label="industrial"
                                    Class={`btn-light w-100 px-4 mx-0 rounded-1 ${
                                        control.TabSelected === "multipleunits" ? "text-primary" : "text-dark"
                                    }`}
                                    OnClick={() => {
                                        setControl((old) => ({...old, TabSelected: 4}));
                                        window.scrollTo({top: 700, behavior: "smooth"});
                                    }}
                                />
                                {control.TabSelected === 4 && (
                                    <hr className="w-85 border-2 border border-primary opacity-100 my-0" />
                                )}
                            </Col>
                        </Row>
                        {screenSize.width >= 992 ? (
                            <Row className="position-absolute bg-white w-65">
                                <Input
                                    ContainerClass="col-3 m-3 p-0"
                                    Label="searchfor"
                                    Disabled
                                    Placeholder="whatareyoulookingfor?"
                                    Value={searchModel.searchkey}
                                    OnChange={(searchkey) => {
                                        setSearchModel((old) => ({...old, searchkey}));
                                    }}
                                />
                                <Select
                                    Disabled
                                    Options={CountriesSelector.data.Countries}
                                    Key="id"
                                    KeyValue="country"
                                    Value={searchModel.country}
                                    OnChange={() => {}}
                                    Label="location"
                                    ContainerClass="col m-3 p-0"
                                />
                                <Select
                                    Disabled
                                    Options={data.PriceRanges}
                                    Label="pricerange"
                                    ContainerClass="col m-3 p-0"
                                />
                                <Select Disabled Options={data.AreaSpaces} Label="area" ContainerClass="col m-3 p-0" />
                                <Col className="align-self-center col-auto">
                                    <Button
                                        // Label="search"
                                        OnClick={SearchHandle}
                                        StartIcon={
                                            <IoSearchOutline className="btn btn-primary text-light fs-1 mt-4 p-2 rounded" />
                                        }
                                    />
                                </Col>{" "}
                            </Row>
                        ) : (
                            <Row className="row-cols-2">
                                <Input
                                    ContainerClass="col-12 col-sm-6 my-3 p-0 px-2"
                                    Label="searchfor"
                                    Placeholder="whatareyoulookingfor?"
                                    Value={searchModel.searchkey}
                                    OnChange={(searchkey) => {
                                        setSearchModel((old) => ({...old, searchkey}));
                                    }}
                                />
                                <Select
                                    Options={CountriesSelector.data.Countries}
                                    Key="id"
                                    KeyValue="country"
                                    Value={searchModel.country}
                                    OnChange={() => {}}
                                    Label="location"
                                    ContainerClass="col-12 col-sm-6 my-3 p-0 px-2"
                                />
                                <Select
                                    Options={data.PriceRanges}
                                    Label="pricerange"
                                    ContainerClass="col-12 col-sm-6 my-3 p-0 px-2"
                                />
                                <Select
                                    Options={data.AreaSpaces}
                                    Label="area"
                                    ContainerClass="col-12 col-sm-6 my-3 p-0 px-2"
                                />
                                <Col className="align-self-center col-12 my-4 pt-2">
                                    <Button
                                        Label="search"
                                        Variant="primary w-100"
                                        OnClick={SearchHandle}
                                        StartIcon={<IoSearchOutline className="text-light fs-4 me-1 rounded" />}
                                    />
                                </Col>
                            </Row>
                        )}
                    </Col>
                    <Col className="d-none d-lg-block p-0 mx-5 " style={{minHeight: 600}}>
                        <Image src={bgPropHome} />
                    </Col>
                </Row>
            </section>

            <section>
                <section className="my-5 container">
                    <Row>
                        <div className="fs-4 fw-bold text-primary  ">
                            {app.translate("mostpopularof") +
                                " " +
                                (control.TabSelected === 1
                                    ? app.translate("residentialproperties")
                                    : control.TabSelected === 2
                                    ? app.translate("commercialproperties")
                                    : control.TabSelected === 3
                                    ? app.translate("agriculturalproperties")
                                    : app.translate("industrialproperties"))}
                        </div>
                    </Row>
                    {/* <OverflowX> */}
                    <Row xs={1} sm={2} md={3} xl={4}>
                        {propertyByCategorySelector.status !== "succeeded" ? (
                            [0, 1, 2, 3, 4, 5, 6, 7].map((cat, index) => {
                                return (
                                    <Col key={index}>
                                        <PropertyCard ShowSkeleton />
                                    </Col>
                                );
                            })
                        ) : propertyByCategorySelector.data.proprety &&
                          propertyByCategorySelector.data.proprety.length > 0 ? (
                            propertyByCategorySelector.data.proprety.map((item, index) => {
                                return (
                                    <Col>
                                        {console.log("item >> ", item)}
                                        <PropertyCard
                                            Beds={item.beds}
                                            Bath={item.baths}
                                            Space={item.area}
                                            PropType={item.prop_type}
                                            PropertyId={item.id}
                                            SubTitle="0 Ads"
                                            ImgSrc={
                                                item.proprety_image && item.proprety_image.length > 0
                                                    ? item.proprety_image[0].proprety_image
                                                    : ""
                                            }
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
                            })
                        ) : (
                            <Col className="text-center" xs={12}></Col>
                        )}
                    </Row>
                    {/* <Row className="justify-content-center">
                            <Button Class="btn-primary text-light col-auto" Label="View More" OnClick={() => {}} />
                        </Row> */}
                    {/* </OverflowX> */}
                </section>
            </section>
        </>
    );
}
