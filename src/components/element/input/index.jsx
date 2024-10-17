/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Input from "./Input";

const InputForm = (props) => {
  const { name, type, placeholder, logoLeft, logoRight } = props;
  return (
    <div className="mb-4 mt-4">
      <Input
        logoLeft={logoLeft}
        type={type}
        name={name}
        placeholder={placeholder}
        logoRight={logoRight}
      />
    </div>
  );
};
export default InputForm;
