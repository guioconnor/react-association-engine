import styled from "styled-components";

const Score = styled.li`
  width: 100%;
  display: inline-block;
  background: ${props => (props.solved ? "orange" : "transparent")};
  flex: 1;
  text-align: center;
  filter: saturate(${props => (props.solved ? "100%" : "0")});
`;

export default Score;
