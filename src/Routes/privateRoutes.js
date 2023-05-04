import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";
import {Container} from "react-bootstrap";
import Navbar from "../Layouts/navbar";

export function PrivateRoute(props) {
    return (
        <div className="overflow-hidden">
            {/* Here private layout */}
            {/* <Navbar fixed="top" > */}
            <Header />
            <Navbar />
            {/* </Navbar> */}
            <Outlet />
        </div>
    );
}
