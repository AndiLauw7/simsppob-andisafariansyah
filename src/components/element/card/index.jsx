/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card, Container } from "react-bootstrap";

const CardCustum = (props) => {
  const {
    backgroundImage,
    titleClass,
    titleHeader,
    titleBody,
    titleFooter,
    logoTop,
    classname,
    onClick,
    styles = {},
  } = props;

  const defaultBodyStyle = {
    border: "none",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
    color: "white",
    padding: "16px",
  };

  return (
    <div className="cardCustom">
      <Card
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
        {...styles.cardStyle}
      >
        {logoTop && (
          <Card.Img variant="top" src={logoTop} style={{ ...styles.logoTop }} />
        )}
        <Card.Body
          onClick={onClick}
          style={{ ...defaultBodyStyle, ...styles.bodyStyle }}
        >
          <Card.Title className={`mb-3 mt-3 ${titleClass || classname}`}>
            {titleHeader}
          </Card.Title>
          <Card.Text className={`fw-bold mb-4 mt-4 ${classname}`}>
            {titleBody}
          </Card.Text>
          <Card.Text className={`{mb-3 mt-3 ${classname}`}>
            {titleFooter}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardCustum;
