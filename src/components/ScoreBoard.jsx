import React from "react";
import styled from "styled-components";

import Score from "./Score";

const StyledScoreBoard = styled.ol`
  display: flex;
  padding: 0;
  list-style-type: none;
  justify-content: center;
`;

const ScoreBoard = ({ score }) => {
  const scores = score.map((solved, position) => <Score solved={solved} />);
  return <StyledScoreBoard>{scores}</StyledScoreBoard>;
};

export default ScoreBoard;
