import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select } from "../../../../Components/index";
import { useSelector, useDispatch } from "react-redux";
import { GetCities } from "../middleware";

function Cities(props) {
  const dispatch = useDispatch();
  const handleChange = (value) => {
    if (props.OnChange && typeof props.OnChange === "function")
      props.OnChange(value);
  };
  const Cities = useSelector((store) => store.Common.Cities.data);

  useEffect(() => {
    if (props.StateId > 0) {
      if (
        Cities.count === undefined ||
        Cities.count <= 0 ||
        (Cities.count > 0 && Cities.Cities[0].state !== props.StateId)
      ) {
        dispatch(GetCities(props.StateId));
      }
    }
  }, [props.StateId]);
  useEffect(() => {
    if (
      Cities.Cities &&
      Cities.Cities.length > 0 &&
      props.OnLoad &&
      typeof props.OnLoad == "function"
    )
      props.OnLoad(Cities.Cities);
  }, [Cities]);
  return (
    <>
      <Select
        Options={props.StateId > 0 ? Cities.Cities : []}
        Value={props.Value}
        Label="city"
        Disabled={props.Disabled}
        OnChange={handleChange}
        Class={props.Class}
        Key={props.Key}
        KeyValue={props.KeyValue}
        ContainerClass={props.ContainerClass}
        LabelClass={props.LabelClass}
        ReadOnly={props.ReadOnly}
        Size={props.Size}
        Placeholder={props.Placeholder}
      />
    </>
  );
}

Cities.propTypes = {
  OnChange: PropTypes.func,
  OnLoad: PropTypes.func,
  Label: PropTypes.string,
  StateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  Key: PropTypes.string,
  KeyValue: PropTypes.string,
  Value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  Placeholder: PropTypes.string,
  HintText: PropTypes.string,
  Class: PropTypes.string,
  ContainerClass: PropTypes.string,
  LabelClass: PropTypes.string,
  Size: PropTypes.string,
  Type: PropTypes.string,
  Disabled: PropTypes.bool,
  ReadOnly: PropTypes.bool,
};
Cities.defaultProps = {
  Class: "shadow-sm",
  ContainerClass: "",
  LabelClass: "mt-3",
  Key: "id",
  KeyValue: "city",
  Placeholder: "",
  Size: "",
  Type: "",
  Disabled: false,
  ReadOnly: false,
};

export default Cities;
