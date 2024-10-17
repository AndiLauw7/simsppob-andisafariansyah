/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "react-bootstrap";

const ComponentButton = (props) => {
  const { children, classname, disabled, onClick, type } = props;
  return (
    <div className="d-grid gap-3">
      <Button
        className={`btn btn-primary size-lg" ${classname}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
    </div>
  );
};

export default ComponentButton;
