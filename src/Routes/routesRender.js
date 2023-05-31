import React, {Suspense} from "react";
import {Route} from "react-router-dom";

export const RoutesRenderer = (routArray) =>
    routArray.map((RouteObj, index) => (
        <Route
            key={index}
            exact
            path={RouteObj.path + (RouteObj.routeParam ? "/:" + RouteObj.routeParam : "")}
            element={
                <Suspense
                    fallback={
                        <div className="justify-content-center px-5 " style={{minHeight: 800, height: 800}}>
                            {/* <Lottie animationData={lottieFile} /> */}
                            {/* <PagePlaceholder /> */}
                        </div>
                    }
                >
                    <RouteObj.element />
                </Suspense>
            }
        />
    ));
