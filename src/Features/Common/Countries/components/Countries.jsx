import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select } from "../../../../Components/index";
import { useSelector, useDispatch } from "react-redux";
import { GetCountries } from "../middleware";

function Countries(props) {
  const dispatch = useDispatch();
  const handleChange = (value) => {
    if (props.OnChange && typeof props.OnChange === "function")
      props.OnChange(value);
  };

  const Countries = useSelector((store) => store.Common.Countries.data);

  useEffect(() => {
    if (Countries.count === undefined || Countries.count <= 0) {
      dispatch(GetCountries());
    }
  }, []);

  useEffect(() => {
    if (
      Countries.Countries &&
      Countries.Countries.length > 0 &&
      props.OnLoad &&
      typeof props.OnLoad == "function"
    )
      props.OnLoad(Countries.Countries);
  }, [Countries]);
  return (
    <Select
      Options={Countries.Countries}
      Value={props.Value}
      Label="country"
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
  );
}

Countries.propTypes = {
  OnChange: PropTypes.func,
  OnLoad: PropTypes.func,
  Label: PropTypes.string,
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
Countries.defaultProps = {
  Class: "shadow-sm",
  ContainerClass: "",
  LabelClass: "mt-3",
  Key: "id",
  KeyValue: "country",
  Placeholder: "",
  Size: "",
  Type: "",
  Disabled: false,
  ReadOnly: false,
};

export default Countries;
