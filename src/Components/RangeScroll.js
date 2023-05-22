import ReactSlider from "multi-range-slider-react";
import {useState} from "react";
import PropTypes from "prop-types";
import * as app from "../Services/app";

export default function RangeScroll(props) {
    function handleChange(values) {
        if (props.OnChange && typeof props.OnChange == "function") props.OnChange(values.minValue, values.maxValue);
    }
    // const [minValue, set_minValue] = useState(25);
    // const [maxValue, set_maxValue] = useState(75);
    // const handleInput = (e) => {
    //     console.log("e :>> ", e);
    //     set_minValue(e.minValue);
    //     set_maxValue(e.maxValue);
    // };
    return (
        <>
            {props.Label && <label className={`  ${props.LabelClass}`}>{app.translate(props.Label)}</label>}
            <ReactSlider
                className="border-0 shadow-none"
                min={props.Min}
                max={props.Max}
                step={props.Step}
                minValue={props.MinValue}
                maxValue={props.MaxValue}
                ruler={props.ShowRuler}
                label={props.ShowLabel}
                preventWheel={props.PreventWheel}
                onChange={handleChange}
            />
        </>
    );
}

RangeScroll.propTypes = {
    OnChange: PropTypes.func,
    Min: PropTypes.number,
    Max: PropTypes.number,
    Step: PropTypes.number,
    Values: PropTypes.number,
    ShowRuler: PropTypes.bool,
    ShowLabel: PropTypes.bool,
    PreventWheel: PropTypes.bool,
    Label: PropTypes.string,
    LabelClass: PropTypes.string,
};

RangeScroll.defaultProps = {
    Min: 0,
    Max: 100000000,
    MinValue: 0,
    MaxValue: 100000000,
    Step: 1,
    ShowRuler: false,
    ShowLabel: true,
    PreventWheel: false,
    LabelClass: "fw-bold",
};
