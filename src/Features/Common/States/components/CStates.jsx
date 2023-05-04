import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Select } from "../../../../Components/index";
import { useSelector, useDispatch } from "react-redux";
import { GetStates } from "../middleware";

function CStates(props) {
  const dispatch = useDispatch();
  const handleChange = (value) => {
    if (props.OnChange && typeof props.OnChange === "function")
      props.OnChange(value);
  };
  const States = useSelector((store) => store.Common.States.data);

  useEffect(() => {
    if (props.CountryId > 0) {
      if (
        States.count === undefined ||
        States.count <= 0 ||
        (States.count > 0 && States.States[0].country !== props.CountryId)
      ) {
        dispatch(GetStates(props.CountryId));
      }
    }
  }, [props.CountryId]);

  useEffect(() => {
    if (
      States.States &&
      States.States.length > 0 &&
      props.OnLoad &&
      typeof props.OnLoad == "function"
    )
      props.OnLoad(States.States);
  }, [States]);

  return (
    <>
      <Select
        Options={props.CountryId > 0 ? States.States : []}
        Value={props.Value}
        Label="state"
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

CStates.propTypes = {
  OnChange: PropTypes.func,
  OnLoad: PropTypes.func,
  Label: PropTypes.string,
  CountryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
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
CStates.defaultProps = {
  Class: "shadow-sm ",
  ContainerClass: "",
  LabelClass: "mt-3",
  Key: "id",
  KeyValue: "state",
  Placeholder: "",
  Size: "",
  Type: "",
  Disabled: false,
  ReadOnly: false,
};

export default CStates;
