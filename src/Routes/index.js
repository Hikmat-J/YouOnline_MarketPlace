import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {PublicRoute} from "./publicRoutes";
import {PrivateRoute} from "./privateRoutes";
import {DashboardRoute} from "./dashboardRoute";
import {privateRoutes, publicRoutes} from "./routeList";
import {useSelector} from "react-redux";
import {RoutesRenderer} from "./routesRender";
import * as app from "../Services/app";
// import {TransitionGroup, CSSTransition} from "react-transition-group";

export default function AppRoutes() {
    let routeState = useSelector((store) => store.Auth.route);
    let token = app.getCookie("jwt-Auzhorization", "");
    return (
        <>
            <Routes>
                {" "}
                {token === "" ? (
                    <Route element={<PublicRoute />}>{RoutesRenderer(publicRoutes)}</Route>
                ) : routeState === "dashboard" ? (
                    <Route element={<DashboardRoute />}>{RoutesRenderer(privateRoutes)}</Route>
                ) : (
                    <Route element={<PrivateRoute />}>{RoutesRenderer(privateRoutes)}</Route>
                )}
            </Routes>
        </>
    );
}
