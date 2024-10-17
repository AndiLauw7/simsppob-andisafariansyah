/* eslint-disable no-unused-vars */
import React from "react";
import AuthLayouts from "../components/layouts/AuthLayouts";
import FormRegistrasi from "../components/fragments/FormRegistrasi";

const RegisterPage = () => {
  return (
    <>
      <AuthLayouts title="Lengkapi data untuk membuat akun">
        <FormRegistrasi />
      </AuthLayouts>
    </>
  );
};
export default RegisterPage;
