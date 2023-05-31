import React, {useState} from "react";
import * as app from "../../Services/app";
import {Col, Row, Container, Image} from "react-bootstrap";
import {SignInForm, SignupForm, ForgotPasswordForm, RecoverPasswordForm} from "../../Features/Auth/components";
import {IoLanguageOutline} from "react-icons/io5";
import {FaLanguage} from "react-icons/fa";
import {Button, Dropdown} from "../../Components";
import AuthIcon from "../../assets/images/AuthIcons.svg";

export default function Auth(props) {
    const [data, setData] = useState({
        leftTextsElms: {
            Signin: (
                <>
                    <p className="h1 fw-bold">
                        {app.translate("Welcome")}
                        <br />
                        {app.translate("Back")}
                    </p>
                    <p>
                        {app.translate("Start buying, selling, posting, and many more on YouOnline,")}
                        <br /> the best marketplace for you.
                    </p>
                </>
            ),
            Signup: (
                <>
                    <p className="h1 fw-bold">
                        {app.translate("Let's Get")}
                        <br />
                        {app.translate("Started")}
                    </p>
                    <p>
                        {app.translate("Start buying, selling, posting, and many more on YouOnline,")}
                        <br /> the best marketplace for you.
                    </p>
                </>
            ),
            ForgotPassword: (
                <>
                    <p className="h1 fw-bold">
                        {app.translate("Forget")}
                        <br />
                        {app.translate("Password")}
                    </p>
                    <p>
                        {app.translate("Start buying, selling, posting, and many more on YouOnline,")}
                        <br /> the best marketplace for you.
                    </p>
                </>
            ),
            RecoverPassword: (
                <>
                    <p className="h1 fw-bold">
                        {app.translate("Recover")}
                        <br />
                        {app.translate("Password")}
                    </p>
                    <p>
                        {app.translate("Start buying, selling, posting, and many more on YouOnline,")}
                        <br /> the best marketplace for you.
                    </p>
                </>
            ),
        },
    });

    const [control, setControl] = useState({
        activeForm: "signin",
        lang: app.getCookie("lang", ""),
        leftTexts_Elm: data.leftTextsElms.Signin,
    });

    return (
        <div className="d-flex position-relative row g-0">
            <Row className="flex-fill">
                <Col
                    className="bg-warning d-none d-lg-block p-0 m-0 min-vh-100"
                    style={{
                        background: "linear-gradient(180deg, #39B68D 0%, #01736E 110.66%)",
                    }}
                >
                    <Row className="ps-4">
                        <Col sm="2" className="text-end m-3 ms-0">
                            <Dropdown
                                Variant="light"
                                StartIcon={<IoLanguageOutline className="fs-4 text-primary p-0 m-0" />}
                                Options={[
                                    {Key: "en", Value: "En"},
                                    {Key: "ar", Value: "Ar"},
                                ]}
                                Value={control.lang}
                                OnChange={(langKey) => {
                                    app.setCookie("lang", langKey);
                                    window.location.reload();
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="h-auto w-100 m-0">
                        <Image src={AuthIcon}  className="min-vh-40 p-0 m-0 " height={510} />
                    </Row>
                    <div className="ms-5 ps-2">
                        <Row className="text-light">{control.leftTexts_Elm}</Row>
                    </div>
                </Col>
                <Col lg={6} className="align-self-center ">
                    <Container>
                        {
                            // control.activeForm === "startup" ? (
                            //   <div className="mx-5">
                            //     <Row className="my-4">
                            //       <Button
                            //         Class="w-100 text-light fw-normal shadow-primary shadow-sm border border-1 border-black"
                            //         Variant="primary"
                            //         Size="lg"
                            //         Label="signin"
                            //         OnClick={() => {
                            //           setControl((old) => ({ ...old, activeForm: "signin" }));
                            //         }}
                            //       />
                            //     </Row>
                            //     <Row>
                            //       <Col>
                            //         <hr />
                            //       </Col>
                            //       <Col className="col-auto">{app.translate("or")}</Col>
                            //       <Col>
                            //         <hr />
                            //       </Col>
                            //     </Row>
                            //     <Row className="my-3">
                            //       <Button
                            //         Class="w-100 text-light fw-normal shadow-primary shadow-sm border border-1 border-black"
                            //         Size="lg"
                            //         Variant="primary"
                            //         Label="createanaccount"
                            //         OnClick={() => {
                            //           setControl((old) => ({ ...old, activeForm: "signup" }));
                            //         }}
                            //       />
                            //     </Row>
                            //   </div>
                            // ) :

                            control.activeForm === "signin" ? (
                                <SignInForm
                                    Control={control}
                                    Data={data}
                                    ChangeData={(newData) => setData(newData)}
                                    ChangeControl={(newControl) => setControl(newControl)}
                                />
                            ) : control.activeForm === "signup" ? (
                                <SignupForm
                                    Control={control}
                                    Data={data}
                                    ChangeData={(newData) => setData(newData)}
                                    ChangeControl={(newControl) => setControl(newControl)}
                                />
                            ) : control.activeForm === "forgotpassword" ? (
                                <ForgotPasswordForm
                                    Control={control}
                                    Data={data}
                                    ChangeData={(newData) => setData(newData)}
                                    ChangeControl={(newControl) => setControl(newControl)}
                                />
                            ) : (
                                <RecoverPasswordForm
                                    Control={control}
                                    Data={data}
                                    ChangeData={(newData) => setData(newData)}
                                    ChangeControl={(newControl) => setControl(newControl)}
                                />
                            )
                        }
                    </Container>
                </Col>
            </Row>
        </div>
    );
}
