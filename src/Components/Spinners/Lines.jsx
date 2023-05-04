import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

import {RotatingLines} from "react-loader-spinner";

export default function SpinnerLines(props) {
    return (
        props.Show && (
            <div className="overlay show" style={{zIndex: 999999}}>
                <div className="spanner show">
                    <RotatingLines
                        strokeColor="#03731f"
                        strokeWidth="2"
                        animationDuration="0.85"
                        width="60"
                        visible={true}
                    />
                </div>
            </div>
        )
        // <div>
        //     <div className="overlay show"></div>
        //     <div className="spanner show">
        //         <div className="loader"></div>
        //     </div>
        // </div>
    );
}

SpinnerLines.prototype = {
    Show: PropTypes.bool.isRequired,
};
