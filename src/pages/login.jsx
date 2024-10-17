/* eslint-disable no-unused-vars */
import React from "react";
import AuthLayouts from "../components/layouts/AuthLayouts";
import FormLogin from "../components/fragments/FormLogin";

const LoginPage = () => {
  return (
    <>
      <AuthLayouts title="Masuk atau buat akun untuk memulai">
        <FormLogin />
      </AuthLayouts>
    </>
  );
};
export default LoginPage;
