import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GetProfileDetails } from "../Features/Profile/Details/middleware";
import * as app from "../Services/app";
import * as Constants from "../Utils/constants";
import { Row, Image, Col } from "react-bootstrap";
import { Button } from "../Components";

import { VscArrowSwap } from "react-icons/vsc";
import { IoIosSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { VscNotebook } from "react-icons/vsc";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";

export default function Sidebar(props) {
    const profileSelector = useSelector((state) => state.Profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [control, setControl] = useState({
        ShowSidebar: true,
    });
    const [data, setData] = useState({
        Items: [
            {
                Title: "dashboard",
                Link: "/Profile/Dashboard",
                Icon: (
                    <MdSpaceDashboard
                        className="m-2 fs-4"
                        style={{ backgroundColor: "rgba(160, 255, 85, 0.2)", color: "#03AA7F" }}
                    />
                ),
            },
            {
                Title: "manageads",
                Link: "/Profile/ManageAds",
                Icon: (
                    <RiAdvertisementFill className="m-2 fs-5" style={{ backgroundColor: "#FFE6F3", color: "#BA0B66" }} />
                ),
            },
            {
                Title: "savedads",
                Link: "/Profile/SavedAds",
                Icon: (
                    <AiOutlineHeart
                        className="m-2 fs-5"
                        style={{ backgroundColor: "rgba(255, 207, 85, 0.2)", color: "#CB9712" }}
                    />
                ),
            },
            {
                Title: "savedresume",
                Link: "/Profile/SavedResume",
                Icon: <VscNotebook className="m-2 fs-5" style={{ backgroundColor: "#FFE2D2", color: "#FF5F07" }} />,
            },
            {
                Title: "myjobs",
                Link: "/Profile/MyJobs",
                Icon: (
                    <BsFillBagCheckFill className="m-2 fs-5" style={{ backgroundColor: "#E1F4FF", color: "#025B8D" }} />
                ),
            },
            {
                Title: "accountsettings",
                Link: "/Profile/Settings",
                Icon: <IoIosSettings className="m-2 fs-5" style={{ backgroundColor: "#F2E4FE", color: "#8500F8" }} />,
            },
        ],
    });
    const SideItem = (props) => {
        return (
            <Row className="ms-4 m-2 " key={props.index}>
                <Col xs={1} className="m-2 me-3">
                    {props.Icon}
                </Col>
                <Col className="m-2">
                    <Button
                        Class="text-dark text-start w-100"
                        Label={app.translate(props.Title)}
                        OnClick={() => {
                            navigate(props.Link);
                        }}
                    />
                </Col>
            </Row>
        );
    };
    useEffect(() => {
        if (profileSelector.status !== "succeeded") dispatch(GetProfileDetails());
    }, []);
    return (
        <>
            <Button
                StartIcon={<VscArrowSwap className="bg-primary text-center w-100 p-1 fs-2 rounded" />}
                OnClick={() => setControl((old) => ({...old, ShowSidebar: !old.ShowSidebar}))}
            />
            <div className="d-flex">
                <div
                    className={`offcanvas offcanvas-start d-none d-lg-inline sticky-lg-top ${control.ShowSidebar && "show"}`}
                    style={{width: 400}}
                    id="bdSidebar"
                    aria-labelledby="bdSidebarOffcanvasLabel"
                >
                    <div className="offcanvas-body flex-grow-0 ">
                        <Row className="justify-content-center">
                            <Col className="col-auto">
                                <Image
                                    src={Constants.BASE_SITE_URL + "" + profileSelector.data.profile_image}
                                    rounded
                                    width={85}
                                    height={85}
                                />
                            </Col>
                        </Row>
                        <Row className="text-center mt-3">
                            <Col>
                                <span className="h3" style={{color: "#555555"}}>
                                    {app.translate("hello")}
                                </span>
                                <span className="fw-bold h3"> {profileSelector.data.fullname}</span>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <span className="h5" style={{color: "#7A7A7A"}}>
                                    {profileSelector.data.email}
                                </span>
                            </Col>
                        </Row>
                    </div>

                    <div className="justify-content-center text-center">
                        {data.Items.map((item, index) => {
                            return SideItem(item, index);
                        })}
                    </div>
                </div>
                {/* <div className="w-100 h-100"> */}
                {props.children}
                {/* </div> */}
            </div>
        </>
        // <div className="container-fluid">
        //     <div className="row flex-nowrap">
        //         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white    ">
        //             <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        //                 <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        //                     <span className="fs-5 d-none d-sm-inline">Menu</span>
        //                 </a>
        //                 <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        //                     <li className="nav-item">
        //                         <a href="#" className="nav-link align-middle px-0">
        //                             <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
        //                         </a>
        //                     </li>
        //                     <li>
        //                         <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
        //                             <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
        //                         <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
        //                             <li className="w-100">
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1 </a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2 </a>
        //                             </li>
        //                         </ul>
        //                     </li>
        //                     <li>
        //                         <a href="#" className="nav-link px-0 align-middle">
        //                             <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span></a>
        //                     </li>
        //                     <li>
        //                         <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
        //                             <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
        //                         <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
        //                             <li className="w-100">
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
        //                             </li>
        //                         </ul>
        //                     </li>
        //                     <li>
        //                         <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
        //                             <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
        //                         <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
        //                             <li className="w-100">
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
        //                             </li>
        //                         </ul>
        //                     </li>
        //                     <li>
        //                         <a href="#" className="nav-link px-0 align-middle">
        //                             <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
        //                     </li>
        //                 </ul>
        //                 <hr />
        //                 <div className ="dropdown pb-4">
        //                 <a href="#" className ="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        //                 <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className ="rounded-circle"/>
        //                 <span className ="d-none d-sm-inline mx-1">loser</span>
        //                 </a>
        //                 <ul className ="dropdown-menu dropdown-menu-dark text-small shadow">
        //                 <li><a className ="dropdown-item" href="#">New project...</a></li>
        //                 <li><a className ="dropdown-item" href="#">Settings</a></li>
        //                 <li><a className ="dropdown-item" href="#">Profile</a></li>
        //                 <li>
        //                 <hr className ="dropdown-divider"/>
        //                 </li>
        //                 <li><a className ="dropdown-item" href="#">Sign out</a></li>
        //                 </ul>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col py-3">
        //             Content area...
        //         </div>
        //     </div>
        // </div>

    );
}
