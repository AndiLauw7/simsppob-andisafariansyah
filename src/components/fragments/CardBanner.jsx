/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import CardCustum from "../element/card";
import { Navigate, useNavigate } from "react-router-dom";

const CardBanner = () => {
  const customStyles = {
    cardStyle: {
      border: "none",
      width: "90px",
      height: "120px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    bodyStyle: {
      width: "70px",
      height: "100px",
      color: "black",
      padding: "0px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    logoTop: {
      width: "71px",
      height: "40px",
      objectFit: "contain",
    },
    titleBody: {
      marginTop: "5px",

      textAlign: "center",
      fontSize: "10px",

      wordWrap: "break-word",
    },
  };

  const { services } = useSelector((state) => state.mainPage);
  const navigate = useNavigate();

  const handleCardClick = (service) => {
    navigate("/pembayaran-banner", { state: { service } });
  };
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {services && services.length > 0 ? (
        services.map((item) => (
          <div key={item.service_code} onClick={() => handleCardClick(item)}>
            <CardCustum
              className="CardService"
              logoTop={item.service_icon}
              titleHeader={item.service_name}
              styles={customStyles}
              titleClass="custom-title"
            />
          </div>
        ))
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

export default CardBanner;
