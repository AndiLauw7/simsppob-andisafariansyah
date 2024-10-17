/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ComponentButton from "../element/button";
import emailImage from "/email.png";
import userImage from "/user.png";
import kunci from "/padlock.png";
import view from "/view.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import Input from "../element/input/Input";

const FormRegistrasi = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    konfirmasipassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldError, setFieldError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password" || name === "konfirmasipassword") {
      validatePassword(value);
    }
  };
  const validatePassword = (password) => {
    // Validasi format password
    const passwordFormat =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordFormat.test(password)) {
      setPasswordError(
        "Password harus minimal 8 karakter, mengandung huruf, angka, dan simbol."
      );
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password, konfirmasipassword } =
      formData;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !konfirmasipassword
    ) {
      setFieldError("Semua bidang harus diisi.");
      return;
    } else {
      setFieldError("");
    }
    if (!email) {
      return;
    }

    if (password !== konfirmasipassword) {
      setPasswordError("Konfirmasi password tidak cocok");
      return;
    }
    if (passwordError) {
      return;
    }
    const dataToSend = {
      first_name,
      last_name,
      email,
      password,
    };
    setSuccessMessage("");
    dispatch(registerUser(dataToSend)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setSuccessMessage("Registrasi berhasil! Silakan login.");
      }
    });
  };
  return (
    <div>
      {fieldError && (
        <div className="alert alert-danger mt-3" role="alert">
          {fieldError}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          Registrasi gagal: {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Registrasi berhasil!
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
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
          logoLeft={userImage}
          type="text"
          name="first_name"
          value={formData.first_name}
          placeholder="nama depan"
          onChange={handleChange}
          autoComplete="given-name"
        />
        <Input
          logoLeft={userImage}
          type="text"
          name="last_name"
          value={formData.last_name}
          placeholder="nama belakang"
          onChange={handleChange}
          autoComplete="family-name"
        />
        {passwordError && (
          <div className="alert alert-danger mt-2" role="alert">
            {passwordError}
          </div>
        )}
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
        <Input
          logoLeft={kunci}
          type="password"
          name="konfirmasipassword"
          value={formData.konfirmasipassword}
          placeholder="konfirmasi password"
          onChange={handleChange}
          logoRight={view}
          autoComplete="new-password"
        />

        <ComponentButton
          type="submit"
          disabled={loading}
          classname="btn btn-danger mt-4 mb-4 size-lg"
        >
          {loading ? "Registering..." : " Registrasi"}
        </ComponentButton>
        <p>
          Sudah punya akun? login
          <span className="text-danger fw-bold">
            <Link to={"/login"} className="text-decoration-none text-danger">
              di sini
            </Link>
          </span>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormRegistrasi;
