import React from "react";
import styled from "styled-components";

import ValueBox from "./ValueBox";
import IconsBox from "./IconsBox";

const StyledOperand = styled.span`
  position: relative
  height: 21vw;
  width: 21vw;
  display: inline-block;
  background: #eee;
  border-radius: 1vw;
  vertical-align: middle;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  `;

const Operand = ({ value, showIcons = false, showValue = true, icon }) => (
  <StyledOperand>
    {showIcons && <IconsBox value={value} icon={icon} />}
    {showValue && <ValueBox>{value}</ValueBox>}
  </StyledOperand>
);

export default Operand;
