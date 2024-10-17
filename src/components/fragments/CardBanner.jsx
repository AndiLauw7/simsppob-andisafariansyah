/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import CardCustum from "../element/card";

const CardBanner = () => {
  const customStyles = {
    cardStyle: {
      border: "none",
      width: "100%",
      height: "200px",
    },
    bodyStyle: {
      width: "70px",
      height: "50px",
      color: "black",
      padding: "0px",
    },
    logoTop: {
      margin: "auto",
      width: "100%",
      height: "100%",
    },
    titleBody: {
      margin: "0px",
    },
  };

  const { services } = useSelector((state) => state.mainPage);

  return (
    <div className="d-flex justify-content-center ">
      {services && services.length > 0 ? (
        services.map((item) => (
          <CardCustum
            className="CardService"
            key={item.service_code}
            logoTop={item.service_icon}
            titleHeader={item.service_name}
            styles={customStyles}
          />
        ))
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

export default CardBanner;
