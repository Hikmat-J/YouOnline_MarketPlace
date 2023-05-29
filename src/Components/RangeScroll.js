import ReactSlider from "multi-range-slider-react";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import * as app from "../Services/app";
import {useDispatch, useSelector} from "react-redux";
import {selectPropertyMinMax} from "../Features/Property/MinMaxRange/slice";
import {PropertyMinMaxApi} from "../Features/Property/MinMaxRange/middleware";

export default function RangeScroll(props) {
    function handleChange(values) {
        if (props.OnChange && typeof props.OnChange == "function") props.OnChange(values.minValue, values.maxValue);
    }
    const dispatch = useDispatch();
    const minmaxSelector = useSelector((state) => selectPropertyMinMax(state));

    useEffect(() => {
        if (minmaxSelector.status === "idle" || minmaxSelector.status === "failed") dispatch(PropertyMinMaxApi());
    }, []);
    return (
        <>
            {props.Label && <label className={`  ${props.LabelClass}`}>{app.translate(props.Label)}</label>}
            <ReactSlider
                barInnerColor="#03AA7F"
                className="border-0 shadow-none"
                min={minmaxSelector.data.min_price}
                max={minmaxSelector.data.max_price}
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
