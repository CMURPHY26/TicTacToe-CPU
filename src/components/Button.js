import React from "react";

const Button = ({onClick, buttonColor, buttonCTA, buttonClasses}) => {
  return (
    <button className={`button ${buttonClasses ? buttonClasses : ""}`} onClick={onClick}>{buttonCTA}</button>
  )
};

export default Button;
