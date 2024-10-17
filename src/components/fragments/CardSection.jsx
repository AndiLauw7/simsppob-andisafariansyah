import { useSelector } from "react-redux";
import CardCustum from "../element/card";
import bgSaldo from "/public/bgSaldo.png";
const CardSection = () => {
  const customStyles = {
    cardStyle: {
      width: "100%",
      height: "100%",
      padding: "50px",
      margin: "500px",
    },

    logoTop: {
      width: "30px",
      height: "20px",
    },
  };

  const { balance } = useSelector((state) => state.mainPage);

  return (
    <div>
      {balance !== null ? (
        <CardCustum
          backgroundImage={bgSaldo}
          titleHeader="Saldo Anda"
          titleBody={`Rp ${balance.toLocaleString()}`}
          titleFooter="Lihat saldo"
          customStyles={customStyles}
        />
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
};

export default CardSection;
