// Button.js
import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick }) => {
  const text = children || ""; // Handle empty text
  return <Btn onClick={onClick}>{text}</Btn>;
};

const Btn = styled.button``;

export default Button;
