/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const LabelForm = (props) => {
  const { htmlFor, children } = props;
  return (
    <label htmlFor={htmlFor} className="form-Label">
      {children}
    </label>
  );
};

export default LabelForm;
