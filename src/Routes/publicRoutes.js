import React from "react";
import {Outlet} from "react-router-dom";

export function PublicRoute(props) {
    return (
        <>
            <div className="overflow-hidden">
                {/* Here public layout */}
                <Outlet />
            </div>
        </>
    );
}
