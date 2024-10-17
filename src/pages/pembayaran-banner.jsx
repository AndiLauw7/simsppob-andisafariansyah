/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Input from "../components/element/input/Input";
import Logo from "/topup.png";
import ComponentButton from "../components/element/button";
import CardUser from "../components/fragments/CardUser";
import CardSection from "../components/fragments/CardSection";
import { fetchBalance, fetchProfile } from "../features/mainPageSlice";
import MainLayout from "../components/layouts/MainLyouts";
import { pembayaranBanners } from "../features/transactionSlice";
const pembayaranBanner = () => {
  const location = useLocation();
  const { service } = location.state;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(service.service_tariff);
  const { balance, profile } = useSelector((state) => state.mainPage);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchBalance(token));
      dispatch(fetchProfile(token));
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);

  const handlePayment = (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");

    const paymentData = {
      total_amount: amount,
      service_code: service.service_code,
      token,
    };

    dispatch(pembayaranBanners(paymentData))
      .unwrap()
      .then((response) => {
        setTransactionDetails(response.data);
        dispatch(fetchBalance(token));
      })
      .catch((error) => {
        return error.response ? error.response.data : error.message;
      });
  };

  return (
    <MainLayout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <CardUser />
          </div>
          <div className="col-md-8">
            <CardSection />
          </div>
        </div>
        <p>Pembayaran</p>
        <div className="d-flex align-items-center">
          <img
            src={service.service_icon}
            alt=""
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <h6 className="mb-0">{service.service_name}</h6>
        </div>
        <form onSubmit={handlePayment}>
          <Input
            logoLeft={Logo}
            type="number"
            placeholder="Enter Amount"
            min={service.service_tariff}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <ComponentButton type="submit" classname="btn btn-danger w-100">
            Bayar
          </ComponentButton>
        </form>

        {transactionDetails && (
          <div className="mt-4 text-success">
            <h4 className="">Transaction Successful</h4>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default pembayaranBanner;
