import React, { Component } from "react";
import styled from "styled-components";

import DraggableResult from "./Result";
import TargetExpression from "./Expression";
import Board from "./Board";
import CustomDragLayer from "./CustomDragLayer";

const TargetSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
`;

const ResultSection = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Game = () => (
  <Board>
    <TargetSection>
      <TargetExpression value={4}>2 + 2</TargetExpression>
      <TargetExpression value={4}>1 + 3</TargetExpression>
      <TargetExpression value={11}>5 + 6</TargetExpression>
      <TargetExpression value={11}>2 + 9</TargetExpression>
      <TargetExpression value={11}>4 + 7</TargetExpression>
      <TargetExpression value={7}>4 + 3</TargetExpression>
    </TargetSection>
    <ResultSection>
      <DraggableResult value={4} />
      <DraggableResult value={8} />
      <DraggableResult value={11} />
      <DraggableResult value={5} />
      <DraggableResult value={7} />
      <DraggableResult value={6} />
    </ResultSection>
    <CustomDragLayer snapToGrid={false} />
  </Board>
);

export default Game;
