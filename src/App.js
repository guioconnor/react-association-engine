import React, { Component } from "react";

import DraggableResult from "./Result";
import TargetExpression from "./Expression";
import Board from "./Board";
import CustomDragLayer from "./CustomDragLayer/index.js";

const Game = () => (
  <Board>
    <TargetExpression value={4}>2 + 2</TargetExpression>
    <TargetExpression value={11}>5 + 6</TargetExpression>
    <TargetExpression value={7}>4 + 3</TargetExpression>
    <DraggableResult value={4} />
    <DraggableResult value={11} />
    <DraggableResult value={7} />
    <CustomDragLayer snapToGrid={false} />
  </Board>
);

export default Game;
