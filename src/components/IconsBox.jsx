import React from "react";
import styled from "styled-components";
import { range } from "lodash";

const StyledIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5.5vw;
`;

const StyledIcons = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 5.5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.2);
`;

const IconsBox = ({ value, icon }) => (
  <StyledIcons>
    {value < 10 && range(value).map(() => <StyledIcon>{icon}</StyledIcon>)}
  </StyledIcons>
);

export default IconsBox;
