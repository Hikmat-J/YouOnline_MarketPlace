import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";
import Navbar from "../Layouts/navbar";
import {Container} from "react-bootstrap";
import Footer from "../Layouts/footer";
// import ScrollToTop from "react-scroll-to-top";

export function DashboardRoute(props) {
    return (
        <>
            {/* Here private layout */}
            <Header />
            <Navbar />
            {/* <ScrollToTop smooth /> */}
            <Sidebar>
                <div className="container w-100 h-100">
                    <Outlet />
                </div>
            </Sidebar>
            <Footer />
        </>
    );
}
