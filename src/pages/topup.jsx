/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import ComponentButton from "../components/element/button";
import Input from "../components/element/input/Input";
import CardSection from "../components/fragments/CardSection";
import CardUser from "../components/fragments/CardUser";
import logoTopUp from "/topup.png";
import { useDispatch, useSelector } from "react-redux";
import { topUp } from "../features/transactionSlice";
import { fetchBalance, fetchProfile } from "../features/mainPageSlice";
import MainLayout from "../components/layouts/MainLyouts";
const TopUp = () => {
  const dispatch = useDispatch();
  const { error, success, balance } = useSelector((state) => state.topup);
  const [jumlahSaldo, setJumlah] = useState("");
  const pilihan = [10000, 20000, 50000, 100000, 250000, 500000];
  const maksimal = 10000000;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "" || isNaN(value)) {
      setJumlah("");
    } else {
      const angkaValue = parseInt(value, 10);
      if (angkaValue <= maksimal) {
        setJumlah(angkaValue);
      }
    }
  };

  const handlePilihClik = (value) => {
    setJumlah(value);
  };

  const handleTopUp = (event) => {
    event.preventDefault();
    if (!jumlahSaldo) return;
    const token = sessionStorage.getItem("token");
    dispatch(topUp({ top_up_amount: jumlahSaldo, token }))
      .unwrap()
      .then(() => {
        dispatch(fetchBalance(token));
        setJumlah("");
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchBalance(token));
      dispatch(fetchProfile(token));
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);
  return (
    <div className=" container-fluid">
      <MainLayout>
        <div className="row">
          <div className="col-md-4 mt-5">
            <CardUser />
          </div>
          <div className="col-md-8 mt-5">
            <CardSection />
          </div>
        </div>

        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6">
              <form onSubmit={handleTopUp}>
                {success && <p className="text-success">{success}</p>}

                <Input
                  logoLeft={logoTopUp}
                  type="number"
                  name="saldo"
                  value={jumlahSaldo}
                  maksimal={maksimal}
                  placeholder="Masukkan nominal saldo"
                  onChange={handleChange}
                  autoComplete="saldo"
                  className="form-control mb-3"
                />
                {error && <p className="text-danger">{error}</p>}

                <ComponentButton
                  type="submit"
                  classname="btn btn-secondary w-100"
                >
                  Top Up
                </ComponentButton>
              </form>
            </div>

            <div className="col-md-6 d-flex align-items-center justify-content-end">
              <div className="row w-100 mt-2 ">
                {pilihan.map((pilih, index) => (
                  <div className="col-4 mb-2 mt-2" key={index}>
                    <ComponentButton
                      onClick={() => handlePilihClik(pilih)}
                      classname="btn btn-light w-100"
                    >
                      Rp {pilih.toLocaleString("id-ID")}
                    </ComponentButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};
export default TopUp;
