import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import {changeLoginState} from "../Features/Auth/slice";
import * as app from "../Services/app";
import {IoSearchOutline, IoLanguageOutline} from "react-icons/io5";
import {BiUserCircle} from "react-icons/bi";
import {CiLogout} from "react-icons/ci";
import {IoIosSettings} from "react-icons/io";
import {MdSpaceDashboard} from "react-icons/md";
import {RiAdvertisementFill} from "react-icons/ri";
import {AiOutlineHeart} from "react-icons/ai";
import {VscNotebook} from "react-icons/vsc";
import {BsFillBagCheckFill} from "react-icons/bs";
import {TfiHelpAlt} from "react-icons/tfi";
import {Button, Dropdown, Input, Select} from "../Components";
import {useDispatch, useSelector} from "react-redux";
import * as Constants from "../Utils/constants";
import {useNavigate} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

export default function Header(props) {
    const [model, setModel] = useState({
        search: "",
        Currency_Id: 0,
    });
    const [data, setData] = useState({
        Currencies: [],
        ProfileImg_Options: [],
    });
    const [control, setControl] = useState({
        lang: app.getCookie("lang", "en"),
    });
    const profileSelector = useSelector((state) => state.Auth.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const FillProfileImg_Options = () => {
        setData((old) => ({
            ...old,
            ProfileImg_Options: [
                {
                    Key: "Dashboard",
                    Value: app.translate("dashboard"),
                    StartIcon: (
                        <MdSpaceDashboard
                            className="m-2 fs-5"
                            style={{backgroundColor: "rgba(160, 255, 85, 0.2)", color: "#03AA7F"}}
                        />
                    ),
                },
                {
                    Key: "Ads",
                    Value: app.translate("manageads"),
                    StartIcon: (
                        <RiAdvertisementFill
                            className="m-2 fs-5"
                            style={{backgroundColor: "#FFE6F3", color: "#BA0B66"}}
                        />
                    ),
                },
                {
                    Key: "SavedAds",
                    Value: app.translate("savedads"),
                    StartIcon: (
                        <AiOutlineHeart
                            className="m-2 fs-5"
                            style={{backgroundColor: "rgba(255, 207, 85, 0.2)", color: "#CB9712"}}
                        />
                    ),
                },
                {
                    Key: "SavedResume",
                    Value: app.translate("savedresume"),
                    StartIcon: (
                        <VscNotebook className="m-2 fs-5" style={{backgroundColor: "#FFE2D2", color: "#FF5F07"}} />
                    ),
                },
                {
                    Key: "MyJobs",
                    Value: app.translate("myjobs"),
                    StartIcon: (
                        <BsFillBagCheckFill
                            className="m-2 fs-5"
                            style={{backgroundColor: "#E1F4FF", color: "#025B8D"}}
                        />
                    ),
                },
                {
                    Key: "Settings",
                    Value: app.translate("accountsettings"),
                    StartIcon: (
                        <IoIosSettings className="m-2 fs-5" style={{backgroundColor: "#F2E4FE", color: "#8500F8"}} />
                    ),
                },
                {
                    Key: "Help",
                    Value: app.translate("helpandsupport"),
                    StartIcon: (
                        <TfiHelpAlt className="m-2 fs-5" style={{backgroundColor: "#FFE8E0", color: "#882607"}} />
                    ),
                },
                {
                    Key: "logout",
                    Value: app.translate("logout"),
                    StartIcon: <CiLogout className="m-2 fs-5" style={{backgroundColor: "#F2E4FE", color: "#882887"}} />,
                },
            ],
        }));
    };
    useEffect(() => {
        FillProfileImg_Options();
    }, []);
    return (
        <>
            <Navbar bg="primary" expand="lg">
                <Container>
                    <Navbar.Brand
                        className="text-light mx-2"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        YouOnline
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav.Item className="w-50">
                            <Input
                                Type="search"
                                Size="sm"
                                Class={`shadow-sm p-2 border-0 ${
                                    control.lang === "ar"
                                        ? "rounded-end rounded-5 rounded-start-0 "
                                        : "rounded-start rounded-5 rounded-end-0"
                                }`}
                                // InputGroupClass=""
                                StartIcon={<IoSearchOutline className="mx-3 border-0 " />}
                                StartIconClass={`bg-white border-0 ${
                                    control.lang === "en"
                                        ? "rounded-end rounded-5 rounded-start-0 "
                                        : "rounded-start rounded-5 rounded-end-0"
                                }
                                `}
                                Placeholder="whatareyoulookingfor?"
                                Value={model.search}
                                OnChange={(search) => setModel((old) => ({...old, search}))}
                            />
                        </Nav.Item>
                        <Nav>
                            <Nav.Item>
                                <Dropdown
                                    Variant="light mt-1 p-1"
                                    ContainerClass="mx-2"
                                    StartIcon={<IoLanguageOutline line className=" text-primary fs-4 mt-1 p-0 m-0" />}
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
                            </Nav.Item>
                            <Nav.Item>
                                <Dropdown
                                    //Img
                                    Variant="light mt-1 p-1"
                                    StartIcon={<BiUserCircle line className=" text-primary fs-4 mt-1 p-0 m-0" />}
                                    //ImgSrc={Constants.IMAGES_URL + "" + profileSelector.profile_image}
                                    OnChange={(key) => {
                                        if (key === "logout") {
                                            app.setCookie("jwt-Auzhorization", "");
                                            dispatch(changeLoginState(""));
                                        } else {
                                            dispatch(changeLoginState("dashboard"));
                                            navigate("/Profile/" + key);
                                        }
                                    }}
                                    // ImgHeight={13}
                                    // ImgWidth={13}
                                    ContainerClass="mx-2"
                                    Options={data.ProfileImg_Options}
                                />
                            </Nav.Item>
                            <Nav.Item>
                                <Button
                                    Class="text-primary mx-2 mt-1"
                                    Variant="light"
                                    Label="addpost"
                                    OnClick={() => {
                                        dispatch(changeLoginState(""));
                                        navigate("/AddPost");
                                    }}
                                />
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

// <>
//     <header className="p-1 bg-primary">
//         <div className="container">
//             <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
//                 <a
//                     href="/"
//                     className="d-flex align-items-center mb-2 mb-lg-0 mt-lg-1 text-white text-decoration-none"
//                 >
//                     {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
//                         <use xlink:href="#bootstrap" />
//                     </svg> */}
//                     <h5 className="fw-bold">YouOnline</h5>
//                 </a>

//                 {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                     <li>
//                         <a href="#" className="nav-link px-2 text-secondary">
//                             Home
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link px-2 text-white">
//                             Features
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link px-2 text-white">
//                             Pricing
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link px-2 text-white">
//                             FAQs
//                         </a>
//                     </li>
//                     <li>
//                         <a href="#" className="nav-link px-2 text-white">
//                             About
//                         </a>
//                     </li>
//                 </ul> */}

//                 <Col lg={6} className=" mb-3 mb-lg-0 mx-4 rounded-5 ">
//                     <Input
//                         Type="search"
//                         Size="sm"
//                         Class={`shadow-sm p-2 border-0 ${
//                             control.lang === "ar"
//                                 ? "rounded-end rounded-5 rounded-start-0 "
//                                 : "rounded-start rounded-5 rounded-end-0"
//                         }`}
//                         // InputGroupClass=""
//                         StartIcon={<IoSearchOutline className="mx-3 border-0 " />}
//                         StartIconClass={`bg-white border-0 ${
//                             control.lang === "en"
//                                 ? "rounded-end rounded-5 rounded-start-0 "
//                                 : "rounded-start rounded-5 rounded-end-0"
//                         }
//                         `}
//                         Placeholder="whatareyoulookingfor?"
//                         Value={model.search}
//                         OnChange={(search) => setModel((old) => ({...old, search}))}
//                     />
//                 </Col>
//                 {/* <form className=" col-12 col-lg-5 mb-3 mb-lg-0 mx-lg-4">
//                     <input
//                         type="search"
//                         className="form-control form-control-dark"
//                         placeholder="Search..."
//                         aria-label="Search"
//                     />
//                 </form> */}

//                 <div className="text-end">
//                     <Dropdown
//                         MenuStyleWidth=""
//                         Variant="light p-1"
//                         StartIcon={<IoLanguageOutline className=" text-primary p-0 m-0" />}
//                         Options={[
//                             {Key: "en", Value: "En"},
//                             {Key: "ar", Value: "Ar"},
//                         ]}
//                         Value={control.lang}
//                         OnChange={(langKey) => {
//                             app.setCookie("lang", langKey);
//                             window.location.reload();
//                         }}
//                     />
//                     {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                         <li>
//                             <a href="#" className="nav-link px-2 text-light " onClick={()=>{
//                                  app.setCookie("lang", 'ar');
//                                  window.location.reload();
//                             }}>
//                                 {app.translate("ar")}
//                             </a>
//                         </li>
//                         <li>
//                             <a href="#" className="nav-link px-2 text-white" onClick={()=>{
//                                  app.setCookie("lang", 'en');
//                                  window.location.reload();
//                             }}>
//                                 {app.translate("en")}
//                             </a>
//                         </li>
//                     </ul> */}
//                     {/* <button type="button" className="btn btn-outline-light me-2">
//                         Login
//                     </button>
//                     <button type="button" className="btn btn-warning">
//                         Sign-up
//                     </button> */}
//                 </div>
//                 {/* <Select
//                     Class="bg-primary border-0 mx-2"
//                     Size="sm"
//                     Options={data.Currencies}
//                     Value={model.Currency_Id}
//                 /> */}
//                 {/* <Button
//                     Class="text-light mx-2 col-lg-2 col-auto text-end "
//                     Label="signin"
//                     Size="sm"
//                     EndIcon={<IoPersonOutline className="ms-2 fs-5 " />}
//                 /> */}
//                 <Dropdown
//                     Img
//                     ImgSrc={Constants.IMAGES_URL + "" + profileSelector.profile_image}
//                     OnChange={(key) => {
//                         dispatch(changeLoginState("dashboard"));
//                         navigate("/Profile/" + key);
//                     }}
//                     ImgHeight={25}
//                     ImgWidth={25}
//                     Options={data.ProfileImg_Options}
//                 />
//                 <Col className="h-100 my-0 py-0 text-light col-auto">|</Col>
//                 <Col className="text-end">
//                     <Button Class="text-light mx-2 " Label="addpost" Size="sm" />
//                 </Col>
//             </div>
//         </div>
//     </header>
// </>
