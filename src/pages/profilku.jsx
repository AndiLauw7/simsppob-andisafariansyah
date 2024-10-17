/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import MainLayout from "../components/layouts/MainLyouts";
import Input from "../components/element/input/Input";
import emailImage from "/email.png";
import userImage from "/user.png";
import { useDispatch, useSelector } from "react-redux";
import ComponentButton from "../components/element/button";
import { fetchProfile } from "../features/mainPageSlice";
import { useNavigate } from "react-router-dom";

const profilKu = () => {
  const { profile, loading, error } = useSelector((state) => state.mainPage);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile(token));
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  const handleEdit = () => {
    navigate("/profilku-update");
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
                  <Input logoLeft={emailImage} value={profile.email} readOnly />
                  <Input
                    logoLeft={userImage}
                    value={profile.first_name}
                    readOnly
                  />
                  <Input
                    logoLeft={userImage}
                    value={profile.last_name}
                    readOnly
                  />
                  <ComponentButton
                    classname="btn btn-light text-danger border-red"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </ComponentButton>
                  <ComponentButton
                    classname="btn btn-danger mt-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </ComponentButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};
export default profilKu;
