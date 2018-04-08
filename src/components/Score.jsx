import styled from "styled-components";

const Score = styled.li`
  height: 30px;
  width: 100%;
  display: inline-block;
  background: ${props => (props.solved ? "orange" : "#eee")};
  flex: 1;
`;

export default Score;
