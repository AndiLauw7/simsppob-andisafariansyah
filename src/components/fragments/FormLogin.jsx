/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import ComponentButton from "../element/button";
import { Link, Navigate, useNavigate } from "react-router-dom";

import emailImage from "/public/email.png";
import kunci from "/public/padlock.png";
import view from "/public/view.png";
import Input from "../element/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser(formData));
      const result = unwrapResult(resultAction);

      const token = result.data.token;

      if (token) {
        sessionStorage.setItem("token", token);
        localStorage.setItem("userSession", JSON.stringify(result.data.user));
      } else {
        return;
      }

      navigate("/dashboard-home");
    } catch (err) {
      return;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          logoLeft={emailImage}
          type="email"
          name="email"
          value={formData.email}
          placeholder="masukkan email anda"
          onChange={handleChange}
          autoComplete="email"
        />
        <Input
          logoLeft={kunci}
          type="password"
          name="password"
          value={formData.password}
          placeholder="buat password"
          logoRight={view}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <ComponentButton
          type="submit"
          disabled={loading}
          classname="btn btn-danger mt-4 mb-4 size-lg"
        >
          {loading ? "Masuk..." : " Masuk"}
        </ComponentButton>
        <p>
          Belum punya akun? registrasi
          <span className=" fw-bold text-decoration-none">
            <Link to={"/register"} className="text-decoration-none text-danger">
              {" "}
              di sini
            </Link>
          </span>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormLogin;
