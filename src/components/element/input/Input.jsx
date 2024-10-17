/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { Form } from "react-bootstrap";

const Input = (props) => {
  const {
    type,
    placeholder,
    name,
    logoLeft,
    logoRight,
    value,
    onChange,
    autoComplete,
    readOnly,
  } = props;
  return (
    <div className="position-relative ">
      <input
        type={type}
        className="form-control py-2 my-3 "
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        readOnly={readOnly}
        style={{
          paddingLeft: logoLeft ? "30px" : "15px",
          paddingRight: type === "password" ? "30px" : "15px",
        }}
      />
      {logoLeft && (
        <img
          src={`${logoLeft}`}
          alt="logo"
          className="position-absolute"
          style={{
            width: "15px",
            height: "17px",
            top: "53%",
            left: "10px",
            transform: "translateY(-50%)",
          }}
        />
      )}
      {logoRight && (
        <img
          src={logoRight}
          alt="right-logo"
          className="position-absolute"
          style={{
            width: "15px",
            height: "15px",
            top: "53%",
            right: "10px",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </div>
  );
};

export default Input;
