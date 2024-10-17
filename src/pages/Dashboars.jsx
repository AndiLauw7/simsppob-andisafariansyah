/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CardUser from "../components/fragments/CardUser";
import CardSection from "../components/fragments/CardSection";
import CardBanner from "../components/fragments/CardBanner";
import CardSlider from "../components/fragments/CardSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBalance,
  fetchBanner,
  fetchProfile,
  fetchServices,
} from "../features/mainPageSlice";
import MainLayout from "../components/layouts/MainLyouts";

const DashboardLayouts = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.mainPage);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchBalance(token));
      dispatch(fetchServices(token));
      dispatch(fetchBanner(token));
      if (token) {
        dispatch(fetchProfile(token)).then((resultAction) => {
          if (fetchProfile.fulfilled.match(resultAction)) {
            return;
          }
        });
      }
    } else {
      window.location.href = "/login";
    }
  }, [dispatch, token]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    if (error.includes("Token tidak tidak valid atau kadaluwarsa")) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <MainLayout>
        <div className="row">
          <div className="col-md-4 mt-5">
            <CardUser />
          </div>
          <div className="col-md-8 mt-5">
            <CardSection />
          </div>
        </div>
        <div className="col-md-12 mt-5 ">
          <CardBanner />
        </div>
        <div className="col-md-12 mb-5">
          <h3 className="mb-5">Temukan promo menarik lainnya</h3>
          <CardSlider />
        </div>
      </MainLayout>
    </div>
  );
};
export default DashboardLayouts;
