// Toolbar.js
import React from "react";
import styled from "styled-components";
import Button from "./Button.js";

const Toolbar = ({ leftButtons, setState }) => {
  const onClick = (button) => {
    setState(button.state);
  };

  return (
    <Container>
      {leftButtons.map((button, i) => {
        return (
          <Button key={i} onClick={() => onClick(button)}>
            {button.text}
          </Button>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
    width: 100%;
    background-color: rgba(0,0,0, 0.4);
    padding: 10px;
    position: fixed;
    top: 0;
`
export default Toolbar
