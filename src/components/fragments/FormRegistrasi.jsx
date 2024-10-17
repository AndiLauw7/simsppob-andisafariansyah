/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ComponentButton from "../element/button";
import emailImage from "/public/email.png";
import userImage from "/public/user.png";
import kunci from "/public/padlock.png";
import view from "/public/view.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import Input from "../element/input/Input";

const FormRegistrasi = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    konfirmasipassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password, konfirmasipassword } =
      formData;

    if (!email) {
      return;
    }

    if (password !== konfirmasipassword) {
      return;
    }

    const dataToSend = {
      first_name,
      last_name,
      email,
      password,
    };

    dispatch(registerUser(dataToSend));
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
