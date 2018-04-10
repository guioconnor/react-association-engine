import React from "react";
import styled from "styled-components";

import Score from "./Score";

const StyledScoreBoard = styled.ol`
  display: flex;
  padding: 0;
  list-style-type: none;
  justify-content: center;
  line-height: ${props => `${100 / props.roundsCount}vw`};
  font-size: ${props => `${50 / props.roundsCount}vw`};
  background: #ccc;
`;

const ScoreBoard = ({ score, icons }) => {
  const scores = score.map((solved, position) => (
    <Score solved={solved}>{icons[position]}</Score>
  ));
  return (
    <StyledScoreBoard roundsCount={score.length}>{scores}</StyledScoreBoard>
  );
};

export default ScoreBoard;
