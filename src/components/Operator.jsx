import React from "react";
import styled from "styled-components";

const operators = {
  ADDITION: "+",
  SUBTRACTION: "-",
  IDENTITY: "="
};

const StyledOperator = styled.span`
  display: inline-block;
  width: 12vw;
`;

const Operator = ({ operation }) => (
  <StyledOperator> {operators[operation]} </StyledOperator>
);

export default Operator;
