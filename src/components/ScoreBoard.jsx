import React from "react";
import styled from "styled-components";

import Score from "./Score";

const Bar = styled.div`
  position: relative;
  background: #ccc;
  border-radius: 20px;
`;

const Focus = styled.div`
  position: absolute;
  left: ${props => 100 * props.progress / props.total}%;
  transform: scale(1.2);
  width: ${props => 100 / props.total}%;
  height: 100%;
  background: #ffb52e;
  border-radius: 25%;
  transition: left 250ms cubic-bezier(0.68, -0.55, 0.265, 0.55) 50ms;
  box-shadow: 0.3vw 0.3vw 1vw rgba(0, 0, 0, 0.1),
    -0.1vw -0.1vw 0.3vw rgba(0, 0, 0, 0.05);
`;

const ProgresBar = styled.div`
  position: absolute;
  background: #ffa500;
  width: ${props =>
    props.progress === 0 ? 0 : 100 * (props.progress / props.total)}%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  transition: width 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const StyledScoreBoard = styled.ol`
  display: flex;
  padding: 0;
  list-style-type: none;
  justify-content: center;
  line-height: ${props => `${100 / props.roundsCount}vw`};
  font-size: ${props => `${50 / props.roundsCount}vw`};
`;

const ScoreBoard = ({ score, icons, round }) => {
  const scores = score.map((solved, position) => (
    <Score solved={solved} current={position === round}>
      {icons[position]}
    </Score>
  ));
  const progress = score.filter(solved => solved).length;
  const total = score.length;
  return (
    <Bar>
      <ProgresBar progress={progress} total={total} />
      <Focus progress={progress} total={total} />
      <StyledScoreBoard roundsCount={score.length}>{scores}</StyledScoreBoard>
    </Bar>
  );
};

export default ScoreBoard;
