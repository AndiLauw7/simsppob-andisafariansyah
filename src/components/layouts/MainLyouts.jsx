/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import DefaultNavbar from "../element/navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <DefaultNavbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default MainLayout;
