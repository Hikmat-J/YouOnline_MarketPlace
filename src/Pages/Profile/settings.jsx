import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import * as app from "../../Services/app";
import {Input, PhoneInput, ImgProfile_Card, Button} from "../../Components";
import {UpdateProfileModel} from "../../Features/Profile/Details/models/request";
import Countries from "../../Features/Common/Countries/components/Countries";
import States from "../../Features/Common/States/components/CStates";
import Cities from "../../Features/Common/Cities/components/Cities";
import {GetProfileDetails, UpdateProfileDetails} from "../../Features/Profile/Details/middleware";
import {useDispatch, useSelector} from "react-redux";

export default function AccountSettings(props) {
    const dispatch = useDispatch();
    const profileSelector = useSelector((state) => state.Profile);

    const [model, setModel] = useState({
        ...UpdateProfileModel,
    });

    function SaveChanges() {
        let sendModel = {...model, code: model.phone.substring(0, 5)};
        dispatch(UpdateProfileDetails(sendModel));
    }

    useEffect(() => {
        if (profileSelector.status !== "succeeded") dispatch(GetProfileDetails());
    }, []);
    useEffect(() => {
        if (profileSelector.data.id > 0) {
            let tempModel = {
                city: profileSelector.data.city,
                code: profileSelector.data.code,
                country: profileSelector.data.country,
                email: profileSelector.data.email,
                fullname: profileSelector.data.fullname,
                phone: profileSelector.data.phone,
                state: profileSelector.data.state,
                type_user: profileSelector.data.type_user,
            };
            setModel(tempModel);
        }
    }, [profileSelector.data]);
    return (
        <div>
            <Row className="mb-5">
                <ImgProfile_Card Profile={profileSelector.data} ChangeModel={(newModel) => setModel(newModel)} />
            </Row>
            <Row className="ms-1">
                <Row className="fs-4 fw-bold">{app.translate("profilesettings")}</Row>
                <Row className="fs-5 " style={{color: "#7A7A7A"}}>
                    {app.translate("updateprofiledetails")}
                </Row>
            </Row>
            <Row className="my-3">
                <Input
                    Label="fullname"
                    LabelClass="fw-bold pb-1"
                    Value={model.fullname}
                    OnChange={(fullname) => setModel((old) => ({...old, fullname}))}
                />
            </Row>
            <Row className="my-3">
                <Input
                    Label="emailaddress"
                    LabelClass="fw-bold pb-1"
                    Value={model.email}
                    OnChange={(email) => setModel((old) => ({...old, email}))}
                />
            </Row>
            <Row xs={1} md={3}>
                <Countries
                    LabelClass="fw-bold pb-1"
                    Value={model.country}
                    OnChange={(country) => setModel((old) => ({...old, country}))}
                    OnLoad={(countries) =>
                        countries && countries.length > 0 && setModel((old) => ({...old, country: countries[0].id}))
                    }
                />
                <States
                    LabelClass="fw-bold pb-1"
                    Value={model.state}
                    CountryId={model.country}
                    OnChange={(state) => setModel((old) => ({...old, state}))}
                    OnLoad={(states) =>
                        states && states.length > 0 && setModel((old) => ({...old, state: states[0].id}))
                    }
                    Disabled={model.country <= 0}
                />
                <Cities
                    LabelClass="fw-bold pb-1"
                    Value={model.city}
                    StateId={model.state}
                    OnChange={(city) => setModel((old) => ({...old, city}))}
                    OnLoad={(cities) =>
                        cities && cities.length > 0 && setModel((old) => ({...old, city: cities[0].id}))
                    }
                    Disabled={model.state <= 0}
                />
            </Row>
            <Row>
                <PhoneInput
                    Class="w-100"
                    LabelClass=" fw-bold pb-1 my-2 "
                    Value={model.phone}
                    OnChange={(phone) => {
                        setModel((old) => ({...old, phone}));
                    }}
                />
            </Row>
            <Row className="justify-content-end">
                <Button
                    Variant="primary"
                    Class="col-auto text-light m-3 fs-6"
                    Label="savechanges"
                    OnClick={SaveChanges}
                />
            </Row>
        </div>
    );
}
