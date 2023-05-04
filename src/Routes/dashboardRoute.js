import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Layouts/header";
import Sidebar from "../Layouts/sidebar";
import { Container } from "react-bootstrap";

export function DashboardRoute(props) {
    return (
        <>
            {/* Here private layout */}
            <Header />
            <Sidebar >
                <div className=" px-5 py-2 container w-100 h-100">
                    <Outlet />
                </div>
            </Sidebar>
        </>
    );
}
