import React, {useEffect, useState} from "react";
import * as app from "../../../Services/app";
import {Button, Input, Select} from "../../../Components";
import {Col, Row} from "react-bootstrap";
import {BsFacebook} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import {useDispatch, useSelector} from "react-redux";
import {SignIn} from "../middleware";
import {useNavigate} from "react-router-dom";
export default function SignInForm(props) {
    const [model, setModel] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.Auth);
    function SignUpNow() {
        props.ChangeControl({
            ...props.control,
            activeForm: "signup",
            leftTexts_Elm: props.Data.leftTextsElms.Signup,
        });
    }
    function ForgotPassword() {
        props.ChangeControl({
            ...props.control,
            activeForm: "forgotpassword",
            leftTexts_Elm: props.Data.leftTextsElms.ForgotPassword,
        });
    }
    function PostSignIn() {
        dispatch(SignIn(model)).then((_) => navigate("/Home"));
    }
    function ContinueWithFacebook() {}
    function ContinueWithGoogle() {}

    return (
        <div>
            {/* <Row className="text-end">
        <Col>
          <label>{app.translate("donnothaveanaccount")}?</label>
          <label
            onClick={SignUpNow}
            className="text-secondary m-2 "
            style={{ cursor: "pointer" }}
          >
            {app.translate("signupnow")}
          </label>
        </Col>
      </Row> */}
            <Row>
                <label className="fs-2 text-center">{app.translate("hisigninyouraccount")}</label>
            </Row>
            <Row>
                <Input
                    Label="email"
                    Type="email"
                    OnChange={(email) => setModel((old) => ({...old, email}))}
                    Value={model.email}
                    Placeholder={app.translate("enteryouremail")}
                />
                <Input
                    Label="password"
                    Type="password"
                    OnChange={(password) => setModel((old) => ({...old, password}))}
                    Value={model.password}
                    Placeholder={app.translate("enter6digitpassword")}
                />
                <Row className="text-end pe-0">
                    <Col>
                        <label
                            onClick={ForgotPassword}
                            className="text-danger m-2 me-0 fw-bold"
                            style={{cursor: "pointer"}}
                        >
                            {app.translate("forgotpassword")}?
                        </label>
                    </Col>
                </Row>
            </Row>
            <Row className="m-2 my-4">
                <Col lg={5} className="m-auto">
                    <Button Class="text-light w-100" Variant="primary" Label="signin" OnClick={PostSignIn} />
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
            <hr />
            <Row>
                <Col lg={5} className="m-auto">
                    <Button Class="text-light w-100 " Variant="primary" Label="createanaccount" OnClick={SignUpNow} />
                </Col>
            </Row>
        </div>
    );
}
