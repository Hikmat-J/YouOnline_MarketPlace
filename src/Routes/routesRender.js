import React, {Suspense} from "react";
import {Route} from "react-router-dom";

export const RoutesRenderer = (routArray) =>
    routArray.map((RouteObj, index) => (
        <Route
            key={index}
            exact
            path={RouteObj.path + (RouteObj.routeParam ? "/:" + RouteObj.routeParam : "")}
            element={
                <Suspense fallback={<div>Loading...</div>}>
                    <RouteObj.element />
                </Suspense>
            }
        />
    ));
