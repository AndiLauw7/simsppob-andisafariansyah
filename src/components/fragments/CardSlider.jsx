/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import CardCustum from "../element/card";

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const customStyles = {
    cardStyle: {
      borderRadius: "0px",
      border: "none",
      width: "calc(100% - 40px)",
      margin: "0 20px",
      height: "200px",
    },
    bodyStyle: {
      width: "100%",
      height: "100px",
      padding: "10px",
    },
    backgroundImage: {},
  };
  const { banner } = useSelector((state) => state.mainPage);

  return (
    <div className="slider-container ">
      {banner && banner.length > 0 ? (
        <Slider {...settings}>
          {banner.map((item) => (
            <div key={item.id}>
              <CardCustum
                key={item.id}
                backgroundImage={item.banner_image}
                styles={customStyles}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

export default CardSlider;
