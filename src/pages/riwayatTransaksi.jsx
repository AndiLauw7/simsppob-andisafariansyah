/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MainLayout from "../components/layouts/MainLyouts";
import CardUser from "../components/fragments/CardUser";
import CardSection from "../components/fragments/CardSection";
import { fetchBalance, fetchProfile } from "../features/mainPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory } from "../features/riwayatTransaksiSlice";
import ComponentButton from "../components/element/button";
const riwayatTransaksi = () => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector(
    (state) => state.transactions
  );
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchBalance(token));
      dispatch(fetchProfile(token));
      dispatch(getTransactionHistory(token));
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);

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
        <h3>Semua Transaksi</h3>

        {loading && <li>Loading transaction history...</li>}
        {error && <li>Error fetching transaction history: {error}</li>}
        {Array.isArray(history) && history.length > 0 ? (
          history.map((transaction) => (
            <div key={transaction.invoice_number} className="border p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-start">
                  <div className="h6">
                    Rp {transaction.total_amount.toLocaleString("id-ID")}
                  </div>
                  <small className="text-muted">
                    {new Date(transaction.created_on).toLocaleDateString(
                      "id-ID"
                    )}
                  </small>
                </div>
                <div className="text-end border-start ps-3">
                  <div className="h6">{transaction.description}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No transaction history available.</p>
        )}
        <ComponentButton classname="btn btn-light text-danger outline-danger  mx-auto d-block">
          Show more
        </ComponentButton>
      </div>
    </MainLayout>
  );
};

export default riwayatTransaksi;
