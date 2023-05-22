import React, {useState} from "react";
import {Row, Col, Container} from "react-bootstrap";
import {Button, CategoryCard} from "../../Components";
import * as app from "../../Services/app";
import * as Constants from "../../Utils/constants";
import {RequestModel} from "../../Features/Property/Add/models";
import {AiOutlineRightCircle, AiOutlineCheckCircle} from "react-icons/ai";
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {RiImageAddLine} from "react-icons/ri";
import {MdOutlineFactCheck} from "react-icons/md";
import {GiCrown} from "react-icons/gi";
import AddProperty from "./AddProperty";
import {useSelector} from "react-redux";
import {AddProperty as AddPropertyAPI} from "../../Features/Property/Add/middleware";
import {BsCheckCircleFill, BsImage} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

export default function AddPost(props) {
    const [control, setControl] = useState({
        Step: 1,
        selectedCategory: "",
        disableNext: true,
    });
    const profileSelector = useSelector((state) => state.Auth.data);
    const navigate = useNavigate(); 
    const [data, setData] = useState({
        CategoriesTypes: [
            {
                imgSrc: "",
                name: "classified",
                // ads: 120,
            },
            {
                imgSrc: "",
                name: "property",
                // ads: 120,
            },
            {
                imgSrc: "",
                name: "automotive",
                // ads: 120,
            },
            {
                imgSrc: "",
                name: "job",
                // ads: 120,
            },
        ],
    });

    async function Publish(categoryType = "", model) {
        switch (categoryType) {
            case "classified":
                break;
            case "property":
                AddPropertyAPI(model, () => {
                    navigate("/Property/Home");
                });
                break;
            case "automotive":
                break;
            case "job":
                break;
        }
    }

    return (
        <Container>
            <Row className="text-center my-5 py-3  ">
                <h2 className="fw-bold">{app.translate("createyourad")}</h2>
            </Row>
            <Row className="bg-white py-2 pt-0 text-center shadow-sm rounded w-100">
                <Col
                    className={` p-0 ${
                        control.Step > 1 ? "text-primary " : control.Step === 1 ? "text-dark" : " text-gray "
                    } `}
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        if (control.Step > 1) setControl((old) => ({...old, Step: 1}));
                    }}
                >
                    <HiOutlineSquares2X2 className={` fs-2 mx-1  `} />
                    <span className="h-100 fs-6">{app.translate("selectcategory")}</span>
                    <AiOutlineRightCircle className=" mx-2 ms-4" />
                    {
                        <hr
                            className={`w-100 border-2 border  opacity-100 ${
                                control.Step >= 1 ? "border-primary" : " border-grey "
                            }`}
                        />
                    }
                </Col>
                <Col
                    className={` p-0 ${
                        control.Step > 2 ? " text-primary " : control.Step === 2 ? "text-dark" : " text-gray "
                    } `}
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        if (control.Step > 2) setControl((old) => ({...old, Step: 2}));
                    }}
                >
                    <RiImageAddLine className={` fs-2  mx-1  `} />
                    <span className="h-100 fs-6">{app.translate("uploadmedia")}</span>
                    <AiOutlineRightCircle className=" mx-2 ms-4" />
                    {
                        <hr
                            className={`w-100 border-2 border  opacity-100 ${
                                control.Step >= 2 ? "border-primary" : "border-grey"
                            }`}
                        />
                    }
                </Col>
                <Col
                    className={` p-0 ${
                        control.Step > 3 ? " text-primary " : control.Step === 3 ? "text-dark" : " text-gray "
                    } `}
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        if (control.Step > 3) setControl((old) => ({...old, Step: 3}));
                    }}
                >
                    <MdOutlineFactCheck className={` fs-2 mx-1  `} />
                    <span className="h-100 fs-6">{app.translate("createad")}</span>
                    <AiOutlineRightCircle className=" mx-2 ms-4" />
                    {
                        <hr
                            className={`w-100 border-2 border  opacity-100 ${
                                control.Step >= 3 ? "border-primary" : "border-grey"
                            }`}
                        />
                    }
                </Col>
                {/* <Col
                    className={` p-0 ${
                        control.Step > 4 ? " text-primary " : control.Step === 4 ? "text-dark" : " text-gray "
                    } `}
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        if (control.Step > 4) setControl((old) => ({...old, Step: 4}));
                    }}
                >
                    <GiCrown className={` fs-2 mx-1  `} />
                    <span className="h-100 fs-6">{app.translate("choosepackage")}</span>
                    <AiOutlineRightCircle className=" mx-2 ms-4" />
                    {
                        <hr
                            className={`w-100 border-2 border  opacity-100 ${
                                control.Step >= 4 ? "border-primary" : "border-grey"
                            }`}
                        />
                    }
                </Col> */}
                <Col
                    className={` p-0 ${
                        control.Step > 4 ? " text-primary " : control.Step === 4 ? "text-dark" : " text-gray "
                    } `}
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        if (control.Step >= 3) setControl((old) => ({...old, Step: 4}));
                    }}
                >
                    <AiOutlineCheckCircle className={` fs-2 mx-1  `} />
                    <span className="h-100 fs-6">{app.translate("publish")}</span>
                    {
                        <hr
                            className={`w-100 border-2 border  opacity-100 ${
                                control.Step >= 4 ? "border-primary" : "border-grey"
                            }`}
                        />
                    }
                </Col>
            </Row>
            {control.Step === 1 ? (
                <>
                    <Row className="text-center my-5 py-3  ">
                        <h2 className="fw-bold">{app.translate("whatareyouoffering?")}</h2>
                    </Row>
                    <Row className="row-cols-auto justify-content-center my-5 ">
                        {data.CategoriesTypes.map((category, index) => {
                            return (
                                <Col key={index}>
                                    {control.selectedCategory === category.name ? (
                                        <div>
                                            <BsCheckCircleFill
                                                className="text-primary fs-2 position-absolute "
                                                style={{zIndex: 10}}
                                            />
                                        </div>
                                    ) : null}
                                    <CategoryCard
                                        ContainerClass={
                                            control.selectedCategory === category.name
                                                ? "shadow border-primary border-2"
                                                : "shadow-sm"
                                        }
                                        BackgroundColor={control.selectedCategory === category.name && "#F0FFF7"}
                                        Title={category.name}
                                        ImgSrc={Constants.IMAGES_URL + "" + profileSelector.profile_image}
                                        OnClick={() => {
                                            control.selectedCategory === category.name
                                                ? setControl((old) => ({
                                                      ...old,
                                                      selectedCategory: "",
                                                      disableNext: true,
                                                  }))
                                                : setControl((old) => ({
                                                      ...old,
                                                      selectedCategory: category.name,
                                                      disableNext: false,
                                                  }));
                                        }}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </>
            ) : control.Step >= 2 && control.Step <= 4 ? (
                control.selectedCategory === "property" ? (
                    <AddProperty
                        control={control}
                        changeControle={(newControl) => setControl(newControl)}
                        Publish={(model) => Publish(control.selectedCategory, model)}
                    />
                ) : null
            ) : null}
            <Row className="my-3 justify-content-center">
                {control.Step < 4 ? (
                    <>
                        <Button
                            Disabled={control.Step <= 1}
                            Variant="primary col-auto px-5 mx-2"
                            Size="md"
                            OnClick={() => {
                                if (control.Step > 1) setControl((old) => ({...old, Step: old.Step - 1}));
                            }}
                            Label="back"
                        />
                        <Button
                            Disabled={control.disableNext}
                            Variant="primary col-auto px-5 mx-2"
                            Size="md"
                            OnClick={() => {
                                if (control.Step < 4) setControl((old) => ({...old, Step: old.Step + 1}));
                            }}
                            Label="next"
                        />
                    </>
                ) : // ) : (
                //     <Button
                //         Disabled={control.selectedCategory === ""}
                //         Variant="primary col-auto px-5 mx-2"
                //         Size="md"
                //         OnClick={() => {
                //             Publish(control.selectedCategory);
                //         }}
                //         Label="publish"
                //     />
                // )
                null}
            </Row>
        </Container>
    );
}
