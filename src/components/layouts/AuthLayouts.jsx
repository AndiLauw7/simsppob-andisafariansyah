/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import logo from "/public/logol.png";
import sims from "/public/Logo.png";
const AuthLayouts = (props) => {
  const { children, title } = props;
  return (
    <div className="d-flex justify-content-between align-items-center ">
      <div className="flex col-md-6 text-center px-5">
        <div className="px-5 ">
          <img src={sims} alt="Logo" className="px-1" />
          <span className="fw-bold">SIMS PPOB</span>
          <h4 className="fw-bold px-5 mt-3 mb-5 ">{title}</h4>
          {children}
        </div>
      </div>
      <div className="col-md-6 text-center">
        <img
          src={logo}
          alt="Login"
          className="img-fluid"
          style={{ fontSize: "30px" }}
        />
      </div>
    </div>
  );
};
export default AuthLayouts;
