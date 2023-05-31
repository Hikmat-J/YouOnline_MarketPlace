import React from "react";
import {Outlet, useOutlet} from "react-router-dom";
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";
import {Container} from "react-bootstrap";
import Navbar from "../Layouts/navbar";
import Footer from "../Layouts/footer";
import ScrollToTop from "react-scroll-to-top";

export function PrivateRoute(props) {
    const Outlet = useOutlet();

    const getOutLet = () => {
        return Outlet ? (
            <>
                <Header />
                <Navbar />
                <ScrollToTop smooth style={{zIndex: 10}} />
                {/* </Navbar> */}
                {Outlet}
                <Footer />
            </>
        ) : (
            <div style={{height: 1000}}>Loading....</div>
        );
    };

    return (
        <div className="overflow-hidden">
            {/* Here private layout */}
            {/* <Navbar fixed="top" > */}
            {getOutLet()}
        </div>
    );
}
