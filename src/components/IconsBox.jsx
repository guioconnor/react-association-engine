import React from "react";
import styled from "styled-components";
import { range } from "lodash";

const getGridStyle = value => {
  switch (value) {
    case 0:
    case 1:
      return { cols: "1fr", rows: "1fr", fontSize: "12vw", lineHeight: "12vw" };
    case 2:
    case 3:
    case 4:
      return {
        cols: "1fr 1fr",
        rows: "1fr 1fr",
        fontSize: "7vw",
        lineHeight: "7vw"
      };
    case 5:
    case 6:
      return {
        cols: "1fr 1fr",
        rows: "1fr 1fr 1fr",
        fontSize: "4.5vw",
        lineHeight: "4.5vw"
      };
    case 7:
    case 8:
    case 9:
      return {
        cols: "1fr 1fr 1fr",
        rows: "1fr 1fr 1fr",
        fontSize: "5vw",
        lineHeight: "5vw"
      };
    case 10:
    case 11:
    case 12:
      return {
        cols: "1fr 1fr 1fr",
        rows: "1fr 1fr 1fr 1fr",
        fontSize: "3.5vw",
        lineHeight: "4vw"
      };
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      return {
        cols: "1fr 1fr 1fr 1fr",
        rows: "1fr 1fr 1fr 1fr",
        fontSize: "3.5vw",
        lineHeight: "4vw"
      };
    default:
      return {
        cols: "1fr 1fr 1fr 1fr 1fr",
        rows: "1fr 1fr 1fr 1fr",
        fontSize: "2.6vw",
        lineHeight: "4vw"
      };
  }
};

const StyledIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcons = styled.span`
  position: absolute;
  display: grid;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: ${props => getGridStyle(props.value).lineHeight};
  grid-template-columns: ${props => getGridStyle(props.value).cols};
  grid-template-rows: ${props => getGridStyle(props.value).rows};
  font-size: ${props => getGridStyle(props.value).fontSize};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.2);
`;

const IconsBox = props => {
  const { value, icon } = props;
  return (
    <StyledIcons {...props}>
      {value <= 25 && range(value).map(() => <StyledIcon>{icon}</StyledIcon>)}
    </StyledIcons>
  );
};

export default IconsBox;
