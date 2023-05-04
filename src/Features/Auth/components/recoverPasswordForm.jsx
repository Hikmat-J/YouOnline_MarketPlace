import React, {useState} from "react";
import * as app from "../../../Services/app";
import {Button, Input, Select} from "../../../Components";
import {Col, Row} from "react-bootstrap";
import {MdOutlineArrowBackIosNew} from "react-icons/md";
export default function RecoverPasswordForm(props) {
    const [model, setModel] = useState({
        password: "",
        password2: "",
    });

    function ChangePassword() {}
    function Back() {
        props.ChangeControl({
            ...props.control,
            activeForm: "forgotpassword",
            leftTexts_Elm: props.Data.leftTextsElms.ForgotPasswrod,
        });
    }

    return (
        <div>
            <Button StartIcon={<MdOutlineArrowBackIosNew />} OnClick={Back} />
            <Row>
                <label className="fs-2 text-center">{app.translate("recoverpassword")}</label>
            </Row>
            <Row>
                <Input
                    Label="newpassword"
                    Type="password"
                    OnChange={(password) => setModel((old) => ({...old, password}))}
                    Value={model.password}
                    Placeholder={app.translate("enter6digitpassword")}
                />
                <Input
                    Label="confirmPassowrd"
                    Type="password"
                    OnChange={(password2) => setModel((old) => ({...old, password2}))}
                    Value={model.password2}
                    Placeholder={app.translate("reenterpassword")}
                />
            </Row>
            <Row className="m-2 my-4">
                <Button Size="lg" Variant="primary" Label="changepassword" OnClick={ChangePassword} />
            </Row>
        </div>
    );
}
