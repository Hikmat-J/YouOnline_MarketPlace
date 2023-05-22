import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import {Button, Input, Switch} from "../../Components";
import * as app from "../../Services/app";
import {useDispatch, useSelector} from "react-redux";
import {FilterPropertiesApi, selectFilterProperties} from "../../Features/Property/Filter";
import * as RequestModel from "../../Features/Property/Filter/models/request";
import {PropertyCard, RangeScroll, Checkbox} from "../../Components";
import {BsInfinity} from "react-icons/bs";

export default function PropertiesFilter(props) {
    const [model, setModel] = useState({
        ...RequestModel.Model,
    });
    const dispatch = useDispatch();
    const [control, setControl] = useState({
        IsRent: true,
        IsSeal: true,
    });
    const filterPropertiesSelector = useSelector((state) => selectFilterProperties(state));
    useEffect(() => {
        let prop_type = control.IsRent && control.IsSeal ? "" : control.IsRent ? "Rent" : control.IsSeal ? "Sael" : "";
        dispatch(FilterPropertiesApi({...model, prop_type}));
    }, [model, control.IsRent, control.IsSeal]);

    useEffect(() => {
        if (filterPropertiesSelector.status === "succeeded") {
            app.ChangeLinesSpinnerStatus(false);
        }
        if (filterPropertiesSelector.status === "failed") {
            app.ShowTopMessageAlert("Error : " + filterPropertiesSelector.error, "", "danger");
            app.ChangeLinesSpinnerStatus(false);
        }
        if (filterPropertiesSelector.status === "loading") app.ChangeLinesSpinnerStatus(true);
    }, [filterPropertiesSelector.status]);
    return (
        <>
            <Row className="mt-4">
                <Col md={3} className="px-4">
                    <div className="bg-light position-relative px-4 border-1 border rounded-4">
                        <Row className="justify-content-between my-4">
                            <label className="col fs-4 fw-bold">{app.translate("filters")}</label>
                            <Col className="text-end ">
                                <Button
                                    Size="sm"
                                    Label="clearall"
                                    OnClick={() => {}}
                                    Class="btn-light text-primary border border-primary"
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row className="my-2">
                            <RangeScroll
                                Label="Select Range"
                                MinValue={model.minprice}
                                MaxValue={model.maxprice}
                                OnChange={(minprice, maxprice) => setModel((old) => ({...old, minprice, maxprice}))}
                            />
                            {/* <input type="range" multiple /> */}
                        </Row>
                        <Row md={2} className="mx-2 my-4">
                            <Switch
                                Class="col"
                                Label="seal"
                                OnChange={() => setControl((old) => ({...old, IsSeal: !old.IsSeal}))}
                                Checked={control.IsSeal}
                                Id="RentOrSeal"
                            />
                            <Switch
                                Class="col"
                                Label="rent"
                                OnChange={() => setControl((old) => ({...old, IsRent: !old.IsRent}))}
                                Checked={control.IsRent}
                                Id="RentOrSeal"
                            />
                        </Row>
                        <Row md={2} className=" my-4">
                            <Col md={5} className="mx-2">
                                <Input
                                    ContainerClass="w-100 "
                                    Class=" py-0 shadow-sm"
                                    Type="number"
                                    Min={0}
                                    Label="bedrooms"
                                    Value={model.bedrooms}
                                    OnChange={(bedrooms) => setModel((old) => ({...old, bedrooms}))}
                                />
                            </Col>
                            <Col md={5} className="">
                                <Input
                                    ContainerClass="w-100"
                                    Class="py-0  shadow-sm"
                                    Type="number"
                                    Min={0}
                                    Label="baths"
                                    Value={model.baths}
                                    OnChange={(baths) => setModel((old) => ({...old, baths}))}
                                />
                            </Col>
                        </Row>

                        <Row md={2} className="mx-2 my-4">
                            <Checkbox
                                Class="col"
                                Id="check120"
                                Label="sports"
                                Value={model.sports === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, sports: old.sports === 1 ? 0 : 1}));
                                }}
                            />
                            <Checkbox
                                Class="col"
                                Id="check10"
                                Label="furnished"
                                Value={model.furnished === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, furnished: old.furnished === 1 ? 0 : 1}));
                                }}
                            />
                        </Row>

                        <Row md={2} className="mx-2 my-4">
                            <Checkbox
                                Class="col"
                                Id="check_livingRoom"
                                Label="livingroom"
                                Value={model.living_room === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, living_room: old.living_room === 1 ? 0 : 1}));
                                }}
                            />
                            <Checkbox
                                Class="col"
                                Id="check_balcony"
                                Label="balcony"
                                Value={model.balcony === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, balcony: old.balcony === 1 ? 0 : 1}));
                                }}
                            />
                        </Row>

                        <Row md={2} className="mx-2 my-4">
                            <Checkbox
                                Class="col"
                                Id="check_lift"
                                Label="lift"
                                Value={model.lift === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, lift: old.lift === 1 ? 0 : 1}));
                                }}
                            />
                            <Checkbox
                                Class="col"
                                Id="check_parking"
                                Label="parking"
                                Value={model.parking === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, parking: old.parking === 1 ? 0 : 1}));
                                }}
                            />
                        </Row>

                        <Row md={2} className="mx-2 my-4">
                            <Checkbox
                                Class="col"
                                Id="check_gym"
                                Label="gym"
                                Value={model.gym === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, gym: old.gym === 1 ? 0 : 1}));
                                }}
                            />
                            <Checkbox
                                Class="col"
                                Id="check_cinema"
                                Label="cinema"
                                Value={model.cinema === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, cinema: old.cinema === 1 ? 0 : 1}));
                                }}
                            />
                        </Row>

                        <Row md={2} className="mx-2 my-4">
                            <Checkbox
                                Class="col"
                                Id="check_conference"
                                Label="conference"
                                Value={model.conference === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, conference: old.conference === 1 ? 0 : 1}));
                                }}
                            />
                            <Checkbox
                                Class="col"
                                Id="check_swimming_poll"
                                Label="swimmingpool"
                                Value={model.swimming_poll === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, swimming_poll: old.swimming_poll === 1 ? 0 : 1}));
                                }}
                            />
                        </Row>

                        <Row md={2} className="mx-2 my-4">
                            <Checkbox
                                Class="col"
                                Id="check_maid_room"
                                Label="maidroom"
                                Value={model.maid_room === 1}
                                OnChange={() => {
                                    setModel((old) => ({...old, maid_room: old.maid_room === 1 ? 0 : 1}));
                                }}
                            />
                        </Row>
                    </div>
                </Col>
                <Col md={9}>
                    <h3 className="fw-bold my-3">{app.translate("propertiesads")}</h3>
                    <h5 className="text-gray">{`${app.translate("showing")} ${
                        filterPropertiesSelector.data.count
                    } ${app.translate("of")} ${filterPropertiesSelector.data.count} ${app.translate("results")}`}</h5>
                    <Row md={4}>
                        {console.log("filterPropertiesSelector >> ", filterPropertiesSelector)}
                        {filterPropertiesSelector.data.count > 0 &&
                            filterPropertiesSelector.data.proprety.length > 0 &&
                            filterPropertiesSelector.data.proprety.map((item) => {
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
                </Col>
            </Row>
        </>
    );
}
