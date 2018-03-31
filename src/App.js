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
      <TargetExpression value={4}>3 + 1</TargetExpression>
      <TargetExpression value={8}>4 + 4</TargetExpression>
      <TargetExpression value={9}>3 + 6</TargetExpression>
      <TargetExpression value={5}>1 + 4</TargetExpression>
      <TargetExpression value={6}>5 + 1</TargetExpression>
      <TargetExpression value={7}>2 + 5</TargetExpression>
    </TargetSection>
    <ResultSection>
      <DraggableResult value={6} />
      <DraggableResult value={7} />
      <DraggableResult value={8} />
      <DraggableResult value={9} />
      <DraggableResult value={5} />
      <DraggableResult value={4} />
    </ResultSection>
    <CustomDragLayer snapToGrid={false} />
  </Board>
);

export default Game;
