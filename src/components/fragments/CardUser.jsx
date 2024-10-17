import { useSelector } from "react-redux";
import CardCustum from "../element/card";

const CardUser = () => {
  const customStyles = {
    cardStyle: {
      border: "none",
      width: "100%",
    },
    bodyStyle: {
      border: "none",

      backgroundImage: "url('your-custom-image.png')",
      color: "black",
    },

    logoTop: {
      marginLeft: "40px",
      width: "30px",
      height: "20px",
    },
  };

  const { profile, loading, error } = useSelector((state) => state.mainPage);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error}</p>;
  }

  if (!profile) {
    return <p>No profile data available</p>;
  }
  return (
    <div>
      <CardCustum
        logoTop={profile.profile_image}
        titleHeader="Selamat Datang"
        titleBody={`${profile.first_name} ${profile.last_name}`}
        styles={customStyles}
      />
    </div>
  );
};

export default CardUser;
