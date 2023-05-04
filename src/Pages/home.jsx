import React, {useEffect, useRef, useState} from "react";
import * as app from "../Services/app";
import * as Constants from "../Utils/constants";
import {Input, Select, Button, Card, BrandCard, AutomotiveCard, PropertyCard, OverflowX} from "../Components";
import {Row, Col, Tabs, Tab} from "react-bootstrap";
import {ImLocation2} from "react-icons/im";
import {HiLightBulb} from "react-icons/hi";
import {useDispatch, useSelector} from "react-redux";
import {GetFeaturedBrands} from "../Features/Automotive/Brands/Featured/middleware";
import {GetFeaturedAutomotive} from "../Features/Automotive/Featured/middleware";
import {GetFeaturedProperties} from "../Features/Property/Featured/middleware";
import {GetPropertyCategories} from "../Features/Property/Categories/middleware";
import {GetAutomotiveCategories} from "../Features/Automotive/Categories/middleware";
import CategoryCard from "../Components/Cards/CategoryCard";

export default function Home(props) {
    const [model, setModel] = useState({
        searchText: "",
        location: "",
        minPrice: 0,
        maxPrice: 1000000,
        Category_Id: 0,
    });

    const AutomotiveFeaturedSelector = useSelector((state) => state.Automotive.Featrued.data);
    const AutomotiveBrandsSelector = useSelector((state) => state.Automotive.Brands.Featured.data);
    const PropertyFeaturedSelector = useSelector((state) => state.Property.Featured.data);
    const AutomotiveCategoriesSelector = useSelector((state) => state.Automotive.Categories.data);
    const PropertyCategoriesSelector = useSelector((state) => state.Property.Categories.data);

    const [data, setData] = useState({
        Categories: [],
    });

    const [control, setControl] = useState({
        lang: app.getCookie("lang", "en"),
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetFeaturedBrands());
        dispatch(GetFeaturedAutomotive());
        dispatch(GetFeaturedProperties());
        dispatch(GetAutomotiveCategories());
        dispatch(GetPropertyCategories());
    }, []);
    return (
        <>
            <div
                className="d-flex justify-content-center  m-0 align-items-center bg-light"
                style={{
                    height: 490,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: 'url("/bgHome.png"',
                }}
            >
                <div className="bg-white p-4 rounded-4 border-1 ">
                    <Row className="my-2">
                        <div className="text-center fw-bold">{app.translate("searchlistings")}</div>
                    </Row>
                    <Row className="my-2">
                        <Input
                            StartIcon={
                                <HiLightBulb
                                    className={`
                                        bg-primary text-light fs-5 w-100 h-100 px-2 ${
                                            control.lang == "en" ? "rounded-start" : "rounded-end"
                                        }
                                    `}
                                />
                            }
                            StartIconClass={`border-0 ${control.lang == "en" ? "rounded-start" : "rounded-end"}`}
                            OnChange={(searchText) => setModel((old) => ({...old, searchText}))}
                            Value={model.searchText}
                            Placeholder="iamlookingfor..."
                        />
                    </Row>
                    <Row className="my-2">
                        <Select
                            Options={data.Categories}
                            Value={model.Category_Id}
                            Label="selectcategory"
                            OnChange={(Category_Id) => setModel((old) => ({...old, Category_Id}))}
                        />
                    </Row>
                    <Row sm={2} className="my-2">
                        <Input
                            OnChange={(minPrice) => setModel((old) => ({...old, minPrice}))}
                            Value={model.minPrice}
                            Label="minprice"
                        />
                        <Input
                            OnChange={(maxPrice) => setModel((old) => ({...old, maxPrice}))}
                            Value={model.maxPrice}
                            Label="maxprice"
                        />
                    </Row>
                    <Row>
                        <Input
                            StartIcon={
                                <ImLocation2 className="bg-primary text-light fs-6 w-100 h-100 px-2 rounded-start" />
                            }
                            OnChange={(location) => setModel((old) => ({...old, location}))}
                            Value={model.location}
                            Placeholder="location"
                        />
                    </Row>
                    <Row className="m-2 mt-4">
                        <Col lg={5} className="m-auto">
                            <Button Class="w-100 text-light" Variant="primary" Label="search" OnClick={() => {}} />
                        </Col>
                    </Row>
                </div>
            </div>
            <section className="my-5 container">
                <label className="fs-4 fw-bold text-primary  ">{app.translate("browsebycategories")}</label>
                <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3">
                    <Tab eventKey="home" title={app.translate("classified")}>
                        No Classified Categories
                    </Tab>
                    <Tab eventKey="profile" title={app.translate("automotive")}>
                        {AutomotiveCategoriesSelector.count && AutomotiveCategoriesSelector.count > 0 && (
                            <section className="mb-5 container">
                                <OverflowX ContainerClass="row-cols-lg-6 row-cols-auto">
                                    {AutomotiveCategoriesSelector.Categories &&
                                        AutomotiveCategoriesSelector.Categories.length > 0 &&
                                        AutomotiveCategoriesSelector.Categories.map((item, index) => {
                                            return (
                                                <div>
                                                    <CategoryCard
                                                        Ads="0 Ads"
                                                        BackgroundColor={
                                                            index % 2 === 0
                                                                ? Constants.BACK_COLORS_ID_LIST.lightGreen
                                                                : Constants.BACK_COLORS_ID_LIST.lightRed
                                                        }
                                                        ImgSrc={item.image}
                                                        Title={item.name}
                                                    />
                                                </div>
                                            );
                                        })}
                                </OverflowX>
                            </section>
                        )}
                    </Tab>
                    <Tab eventKey="longer-tab" title={app.translate("properties")}>
                        {PropertyCategoriesSelector.count && PropertyCategoriesSelector.count > 0 && (
                            <section className="mb-5 container">
                                <OverflowX ContainerClass="row-cols-lg-6 row-cols-auto">
                                    {PropertyCategoriesSelector.Categories &&
                                        PropertyCategoriesSelector.Categories.length > 0 &&
                                        PropertyCategoriesSelector.Categories.map((item, index) => {
                                            return (
                                                <div>
                                                    <CategoryCard
                                                        Ads="0 Ads"
                                                        BackgroundColor={
                                                            index % 2 === 0
                                                                ? Constants.BACK_COLORS_ID_LIST.lightGreen
                                                                : Constants.BACK_COLORS_ID_LIST.lightRed
                                                        }
                                                        ImgSrc={item.image}
                                                        Title={item.name}
                                                    />
                                                </div>
                                            );
                                        })}
                                </OverflowX>
                            </section>
                        )}
                    </Tab>
                    <Tab eventKey="contact" title={app.translate("jobs")}>
                        No Jobs Categories
                    </Tab>
                </Tabs>
            </section>
            {AutomotiveFeaturedSelector.count && AutomotiveFeaturedSelector.count > 0 && (
                <section className="mb-5 container">
                    <Row>
                        <div className="fs-4 fw-bold text-primary  ">
                            {app.translate("mostpopularof") + " " + app.translate("automotive")}
                        </div>
                    </Row>
                    <OverflowX>
                        {AutomotiveFeaturedSelector.automaotive &&
                            AutomotiveFeaturedSelector.automaotive.length > 0 &&
                            AutomotiveFeaturedSelector.automaotive.map((item, index) => {
                                return (
                                    <div className="col">
                                        <AutomotiveCard
                                            SubTitle="0 Ads"
                                            ImgSrc={item.automotive_image[0].automotive_image}
                                            Title={item.title}
                                            footerText="text"
                                            Country={item.country}
                                            City={item.city}
                                            State={item.state}
                                            Price={item.price}
                                        />
                                    </div>
                                );
                            })}
                    </OverflowX>
                </section>
            )}

            {PropertyFeaturedSelector.count && PropertyFeaturedSelector.count > 0 && (
                <section className="mb-5 container">
                    <Row>
                        <div className="fs-4 fw-bold text-primary  ">
                            {app.translate("mostpopularof") + " " + app.translate("properties")}
                        </div>
                    </Row>
                    <OverflowX>
                        {PropertyFeaturedSelector.proprety &&
                            PropertyFeaturedSelector.proprety.length > 0 &&
                            PropertyFeaturedSelector.proprety.map((item, index) => {
                                return (
                                    <div className="col">
                                        <PropertyCard
                                            SubTitle="0 Ads"
                                            ImgSrc={item.proprety_image[0].proprety_image}
                                            Title={item.title}
                                            footerText="text"
                                            Country={item.country}
                                            City={item.city}
                                            State={item.state}
                                            Price={item.price}
                                        />
                                    </div>
                                );
                            })}
                    </OverflowX>
                </section>
            )}

            {AutomotiveBrandsSelector.count && AutomotiveBrandsSelector.count > 0 && (
                <section className="mb-5 px-3 container">
                    <Row>
                        <div className="fs-4 fw-bold text-primary">
                            {app.translate("mostpopularof") + " " + app.translate("brands")}
                        </div>
                    </Row>
                    <OverflowX>
                        {AutomotiveBrandsSelector.AutomotiveBrands &&
                            AutomotiveBrandsSelector.AutomotiveBrands.length > 0 &&
                            AutomotiveBrandsSelector.AutomotiveBrands.map((item, index) => {
                                return (
                                    <div className="col">
                                        <BrandCard
                                            SubTitle="0 Ads"
                                            ImgClass="rounded-circle"
                                            ImgSrc={item.image}
                                            Title={item.name}
                                        />
                                    </div>
                                );
                            })}
                    </OverflowX>
                </section>
            )}
        </>
    );
}
