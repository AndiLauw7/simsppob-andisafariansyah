/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MainLayout from "../components/layouts/MainLyouts";
import Input from "../components/element/input/Input";
import emailImage from "/email.png";
import userImage from "/user.png";
import { useDispatch, useSelector } from "react-redux";
import ComponentButton from "../components/element/button";
import { fetchProfile, updateProfile } from "../features/mainPageSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditProfilku = () => {
  const { profile, loading, error } = useSelector((state) => state.mainPage);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || ""); // Jika profile.first_name undefined, beri nilai ""
      setLastName(profile.last_name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

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
    } catch (error) {
      return error;
    }
  };

  return (
    <MainLayout>
      <div className="text-center mb-4">
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
                <h1>
                  {profile.first_name} {profile.last_name}
                </h1>
                <div className="text-center w-50 mx-auto">
                  <form onSubmit={handleUpdateProfile}>
                    <Input
                      logoLeft={emailImage}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      logoLeft={userImage}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                      logoLeft={userImage}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />

                    <ComponentButton
                      type="submit"
                      classname="btn btn-danger mt-3"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Simpan"}
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
