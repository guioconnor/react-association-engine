import React from "react";
import styled from "styled-components";

const StyledWellDone = styled.div`
  position: fixed;
  top: 2vw;
  left: 2vw;
  right: 2vw;
  bottom: 2vw;
  font-size: 8vw;
  text-align: center;
  border-radius: 1vw;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
`;

const Text = styled.div`
  padding: 100px 50px 50px 50px;
`;

const Button = styled.button`
  border: none;
  background: #ccc;
  font-size: 5vw;
  padding: 10px 30px;
  border-radius: 1vw;
`;

export default ({ onReset }) => (
  <StyledWellDone>
    <Text>Well Done!</Text>
    <Button onClick={onReset}>Reset</Button>
  </StyledWellDone>
);
