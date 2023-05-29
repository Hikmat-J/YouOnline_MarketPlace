import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SignUpApi} from "../middleware";
import {selectAuth} from "../slice";
import * as RequestModel from "../models/request";
import * as app from "../../../Services/app";
import {Button, Input, PhoneInput} from "../../../Components";
import Countries from "../../Common/Countries/components/Countries";
import Cities from "../../Common/Cities/components/Cities";
import States from "../../Common/States/components/CStates";
import {Col, Row} from "react-bootstrap";
import {BsFacebook, BsBuildings, BsPerson} from "react-icons/bs";
import {MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft} from "react-icons/md";
import {FcGoogle} from "react-icons/fc";

export default function SignupForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authSelector = useSelector((state) => selectAuth(state));
    const [model, setModel] = useState({
        ...RequestModel.SignUpModel.Body,
    });
    const [control, setControl] = useState({
        authStep: 0,
    });
    function Next() {
        setControl((old) => ({...old, authStep: 1}));
    }
    function CreateAccount() {
        var sendModel = {...model, code: model.phone};
        sendModel.code = sendModel.phone.substring(0, 5);
        dispatch(SignUpApi(sendModel));
    }
    function ContinueWithFacebook() {}
    function ContinueWithGoogle() {}
    function SignInNow() {
        props.ChangeControl({
            ...props.control,
            activeForm: "signin",
            leftTexts_Elm: props.Data.leftTextsElms.Signin,
        });
    }
    useEffect(() => {
        if (authSelector.status === "succeeded") {
            document.location.reload();
            app.ChangeLinesSpinnerStatus(false);
        }
        if (authSelector.status === "failed") {
            app.ShowTopMessageAlert("Error : " + authSelector.error, "", "danger");
            app.ChangeLinesSpinnerStatus(false);
        }
        if (authSelector.status === "loading") app.ChangeLinesSpinnerStatus(true);
    }, [authSelector.status]);

    return (
        <>
            {
                // control.authStep === -1 ? (
                //     <div className="mx-5">
                //         <Row className="my-4">
                //             <Button
                //                 Class="w-100 text-light fw-bold shadow-primary shadow-sm border border-1 border-black"
                //                 Variant="primary"
                //                 Size='lg'
                //                 Label="Signin"
                //                 OnClick={SignInNow}
                //             />
                //         </Row>
                //         <Row>
                //             <Col>
                //                 <hr />
                //             </Col>
                //             <Col className="col-auto">OR</Col>
                //             <Col>
                //                 <hr />
                //             </Col>
                //         </Row>
                //         <Row className="my-3">
                //             <Button
                //                 Class="w-100 text-light fw-bold shadow-primary shadow-sm border border-1 border-black"
                //                 Size='lg'
                //                 Variant="primary"
                //                 Label="createanaccount"
                //                 OnClick={() => {
                //                     setControl((old) => ({...old, authStep: 0}));
                //                 }}
                //             />
                //         </Row>
                //     </div>
                // ) :
                control.authStep === 0 ? (
                    <>
                        <Row className="m-5 text-center align-items-center ">
                            <p className="fs-5">{app.translate("chooseaccounttype")}</p>
                            <Col
                                style={{minHeight: 155, cursor: "pointer"}}
                                className={
                                    "rounded p-5 mx-2" +
                                    (model.type_user === 2 ? " text-light bg-primary" : " text-primary bg-light")
                                }
                                onClick={() => {
                                    setModel((old) => ({
                                        ...old,
                                        type_user: old.type_user === 2 ? -1 : 2,
                                    }));
                                }}
                            >
                                <Row className="justify-content-center p-2">
                                    <BsBuildings
                                        className={
                                            "w-50 h-50 rounded " +
                                            (model.type_user === 2
                                                ? " text-light bg-primary"
                                                : " text-primary bg-light")
                                        }
                                        // style={{minHeight: 300}}
                                    />
                                    <Row>
                                        <label className="pt-3 mt-2 ms-0 ps-0 fs-5">{app.translate("company")}</label>
                                    </Row>
                                </Row>
                            </Col>
                            <Col
                                style={{minHeight: 155, cursor: "pointer"}}
                                className={
                                    "rounded p-5 m-0 mx-2 " +
                                    (model.type_user === 1 ? " text-light bg-primary" : " text-primary bg-light")
                                }
                                // onMouseEnter={() => {
                                //   setControl((old) => ({ ...old, personHover: true }));
                                // }}
                                // onMouseLeave={() => {
                                //   setControl((old) => ({ ...old, personHover: false }));
                                // }}
                                onClick={() => {
                                    setModel((old) => ({
                                        ...old,
                                        type_user: old.type_user === 1 ? -1 : 1,
                                    }));
                                }}
                            >
                                <Row className="justify-content-center">
                                    <BsPerson
                                        className={
                                            "w-50 h-50 rounded " +
                                            (model.type_user === 1
                                                ? " text-light bg-primary"
                                                : " text-primary bg-light")
                                        }
                                        // style={{minHeight: 300}}
                                    />
                                    <p className="pt-4 ms-0 ps-0 fs-5 "> {app.translate("personal")}</p>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="m-2 m-4 mx-5">
                            <Col lg={5} className="m-auto">
                                <Button
                                    Class="w-100 "
                                    Variant="primary"
                                    Disabled={model.type_user === -1}
                                    Label="next"
                                    OnClick={Next}
                                />
                            </Col>
                        </Row>
                        <Row className="text-end me-5">
                            <Col>
                                <label>{app.translate("oryouhaveaccount")}?</label>
                                <label
                                    onClick={SignInNow}
                                    className="text-secondary m-2 fw-bold  "
                                    style={{cursor: "pointer"}}
                                >
                                    {app.translate("login")}
                                </label>
                            </Col>
                        </Row>{" "}
                    </>
                ) : control.authStep === 1 ? (
                    <div>
                        <Row>
                            <Col>
                                <Button
                                    StartIcon={
                                        app.getCookie("lang", "en") === "en" ? (
                                            <MdOutlineKeyboardArrowLeft />
                                        ) : (
                                            <MdOutlineKeyboardArrowRight />
                                        )
                                    }
                                    Class="btn-primary text-light  fw-bold border"
                                    OnClick={() => setControl((old) => ({...old, authStep: 0}))}
                                />
                            </Col>
                            <Col className="text-end col-auto">
                                <label>{app.translate("alreadyhaveanaccount")}?</label>
                                <label onClick={SignInNow} className="text-secondary m-2" style={{cursor: "pointer"}}>
                                    {app.translate("signinnow")}
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <label className="fs-2 text-center">{app.translate("createyourfreeaccount")}</label>
                        </Row>
                        <Row xs={1} sm={2}>
                            <Input
                                Label={model.type_user === 1 ? "fullname" : "companyname"}
                                OnChange={(fullname) => setModel((old) => ({...old, fullname}))}
                                Value={model.fullname}
                                Placeholder={app.translate("enteryourname")}
                            />
                            <Input
                                Label="email"
                                Type="email"
                                OnChange={(email) => setModel((old) => ({...old, email}))}
                                Value={model.email}
                                Placeholder={app.translate("enteryouremail")}
                            />
                        </Row>
                        <Row xs={1} sm={2}>
                            <Input
                                Label="password"
                                Type="password"
                                OnChange={(password) => setModel((old) => ({...old, password}))}
                                Value={model.password}
                                Placeholder={app.translate("enter6digitpassword")}
                            />
                            <Input
                                Label="confirmpassword"
                                Type="password"
                                OnChange={(password2) => setModel((old) => ({...old, password2}))}
                                Value={model.password2}
                                Placeholder={app.translate("enter6digitpassword")}
                            />
                        </Row>
                        <Row xs={1} md={2}>
                            <Countries
                                Value={model.country}
                                OnChange={(country) => setModel((old) => ({...old, country}))}
                                OnLoad={(countries) =>
                                    countries &&
                                    countries.length > 0 &&
                                    setModel((old) => ({...old, country: countries[0].id}))
                                }
                            />
                            <States
                                Value={model.state}
                                CountryId={model.country}
                                OnChange={(state) => setModel((old) => ({...old, state}))}
                                OnLoad={(states) =>
                                    states && states.length > 0 && setModel((old) => ({...old, state: states[0].id}))
                                }
                                Disabled={model.country <= 0}
                            />
                        </Row>
                        <Row xs={1} md={2}>
                            <Cities
                                Value={model.city}
                                StateId={model.state}
                                OnChange={(city) => setModel((old) => ({...old, city}))}
                                OnLoad={(cities) =>
                                    cities && cities.length > 0 && setModel((old) => ({...old, city: cities[0].id}))
                                }
                                Disabled={model.state <= 0}
                            />
                            <PhoneInput
                                Class="w-100"
                                Value={model.phone}
                                OnChange={(phone) => {
                                    setModel((old) => ({...old, phone}));
                                }}
                            />
                        </Row>
                        <Row className="m-2 my-4">
                            <Col lg={5} className="m-auto">
                                <Button
                                    Class="w-100 "
                                    Variant="primary"
                                    Label="createanaccount"
                                    OnClick={CreateAccount}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                            <Col className="col-auto">OR</Col>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <Button
                                    Class="w-100 border border-1 border-black"
                                    StartIcon={<BsFacebook className="m-1 me-2 fs-5" color="#425af5" />}
                                    Variant="light"
                                    Label="continuewithfacebook"
                                    OnClick={ContinueWithFacebook}
                                />
                            </Col>
                            <Col>
                                <Button
                                    Class="w-100 border border-1 border-black"
                                    StartIcon={<FcGoogle className="m-1 me-2 fs-5" />}
                                    Variant="light"
                                    Label="continuewithgoogle"
                                    OnClick={ContinueWithGoogle}
                                />
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <label>{app.translate("conditionsagree")}</label>
                                <label onClick={() => {}} className="text-secondary m-2">
                                    {app.translate("termsandconditions")}
                                </label>
                            </Col>
                        </Row>
                    </div>
                ) : null
            }
        </>
    );
}
