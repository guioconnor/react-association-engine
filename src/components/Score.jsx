import React from "react";
import styled from "styled-components";

const Score = styled.li`
  width: 100%;
  display: inline-block;
  flex: 1;
  text-align: center;
  filter: saturate(${props => (props.solved || props.current ? "100%" : "0")});
  transform: scale(${props => (props.current ? "1.15" : "1")});
  font-size: ${props => (props.current ? "1.3em" : "1em")};
  transition: transform 300ms cubic-bezier(0.68, -0.55, 0.265, 13.55) 300ms,
    font-size 300ms cubic-bezier(0.68, -0.55, 0.265, 3.55) 300ms;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

export default ({ children, ...props }) => (
  <Score {...props} className={props.solved ? "solved" : null}>
    {children}
  </Score>
);
