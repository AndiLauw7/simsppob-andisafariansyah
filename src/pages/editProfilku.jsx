/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MainLayout from "../components/layouts/MainLyouts";
import Input from "../components/element/input/Input";
import emailImage from "/email.png";
import userImage from "/user.png";
import { useDispatch, useSelector } from "react-redux";
import ComponentButton from "../components/element/button";
import { fetchProfile, updateProfile } from "../features/mainPageSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditProfilku = () => {
  const { profile, loading, error } = useSelector((state) => state.mainPage);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || ""); // Jika profile.first_name undefined, beri nilai ""
      setLastName(profile.last_name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const checkIfModified = () => {
    if (
      firstName !== profile.first_name ||
      lastName !== profile.last_name ||
      email !== profile.email
    ) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile(token));
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    const updatedProfileData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      const result = await dispatch(
        updateProfile({ token, updatedProfileData })
      ).unwrap();
      setFirstName(result.data.first_name);
      setLastName(result.data.last_name);
      setEmail(result.data.email);
      setIsSaved(true);
      await dispatch(fetchProfile(token));
      setTimeout(() => {
        setIsSaved(false);
        navigate("/profilku-update");
      }, 3000);
    } catch (error) {
      return error;
    }
  };
  const navigate = useNavigate();
  const handleBatal = () => {
    navigate("/profilku");
  };
  return (
    <MainLayout>
      <div className="text-center mb-4">
        <ToastContainer />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {profile && (
              <>
                <img
                  src={profile.profile_image}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />

                <div className="text-center w-50 mx-auto">
                  {isSaved && (
                    <div className="alert alert-success" role="alert">
                      Profile updated successfully!
                    </div>
                  )}
                  <h1>
                    {profile.first_name} {profile.last_name}
                  </h1>
                  <form onSubmit={handleUpdateProfile}>
                    <Input
                      logoLeft={emailImage}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        checkIfModified();
                      }}
                    />
                    <Input
                      logoLeft={userImage}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        checkIfModified();
                      }}
                    />
                    <Input
                      logoLeft={userImage}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        checkIfModified();
                      }}
                    />

                    <ComponentButton
                      type="submit"
                      classname="btn btn-danger mt-3"
                      disabled={!isModified || loading}
                    >
                      {loading ? "Saving..." : "Simpan"}
                    </ComponentButton>
                    <ComponentButton
                      classname="btn btn-danger mt-3"
                      disabled={loading}
                      onClick={handleBatal}
                    >
                      Batal
                    </ComponentButton>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};
export default EditProfilku;
