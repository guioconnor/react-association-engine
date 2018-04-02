import React from "react";
import styled from "styled-components";

const StyledWellDone = styled.div`
  font-size: 36px;
  text-align: center;
`;

const Text = styled.div`
  padding: 100px 50px 50px 50px;
`;

const Button = styled.button`
  border: none;
  background: #ccc;
  font-size: 28px;
  padding: 10px 30px;
  border-radius: 5px;
`;

export default ({ onReset }) => (
  <StyledWellDone>
    <Text>Well Done!</Text>
    <Button onClick={onReset}>Reset</Button>
  </StyledWellDone>
);
