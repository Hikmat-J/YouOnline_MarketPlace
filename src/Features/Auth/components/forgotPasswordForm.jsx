import React, {useState} from "react";
import * as app from "../../../Services/app";
import {Button, Input, Select} from "../../../Components";
import {Col, Row} from "react-bootstrap";
import {MdKeyboardBackspace} from "react-icons/md";
export default function ForgotPasswordForm(props) {
    const [model, setModel] = useState({
        email: "",
    });

    function Send() {}
    function Back() {
        props.ChangeControl({...props.control, activeForm: "signin", leftTexts_Elm: props.Data.leftTextsElms.Signin});
    }

    return (
        <div>
            <Row className="m-2">
                <Button
                    StartIcon={<MdKeyboardBackspace />}
                    Class="btn-primary text-light fw-bold border w-auto"
                    OnClick={Back}
                />
            </Row>
            <Row>
                <label className="fs-2 text-center">{app.translate("forgotpassword")}</label>
            </Row>
            <Row>
                <Input
                    Label="email"
                    Type="email"
                    OnChange={(email) => setModel((old) => ({...old, email}))}
                    Value={model.email}
                    Placeholder={app.translate("enteryouremail")}
                />
            </Row>
            <Row className="m-2 my-4">
                <Col lg={5} className="m-auto">
                    <Button Class='text-light w-100' Variant="primary" Label="send" OnClick={Send} />
                </Col>
            </Row>
        </div>
    );
}
