import React, { Component } from "react";
import styled from "styled-components";
import { random, range } from "lodash";

import Result from "./Result";
import Expression from "./Expression";
import Board from "./Board";
import CustomDragLayer from "./CustomDragLayer";
import WellDone from "./WellDone";

/** Game constants */
const ROUNDS_COUNT = 12;

const TargetSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  margin: auto;
  padding: 10px 0;
`;

const ResultSection = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const generateAdditionExpression = (lowest, highest) => {
  const result = random(lowest, highest);
  const firstOperand = random(lowest - 1, result - 1);
  const secondOperand = result - firstOperand;

  return {
    result,
    firstOperand,
    secondOperand
  };
};

const StyledScore = styled.ol`
  display: flex;
  padding: 0;
  list-style-type: none;
  justify-content: center;
`;

const Score = styled.li`
  height: 30px;
  min-width: 20px;
  width: 100%;
  display: inline-block;
  background: ${props => (props.solved ? "orange" : "#eee")};
  flex: 1;

  &:first-child {
    border-radius: 5px 0 0 5px;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
  }
`;

const ScoreBoard = ({ score }) => {
  const scores = score.map((solved, position) => <Score solved={solved} />);

  return <StyledScore>{scores}</StyledScore>;
};

const OngoingGame = () => {};

class Game extends Component {
  constructor(props) {
    super(props);
    const expression = generateAdditionExpression(2, 10);

    this.state = {
      expressions: [expression],
      score: range(ROUNDS_COUNT).map(() => false),
      round: 0
    };
  }

  isGameCompleted = () => this.state.score.every(round => round === true);

  resetGame = () => {
    const expression = generateAdditionExpression(2, 10);
    this.setState({ expressions: [expression] });
  };

  resolveRound = () => {
    const isGameCompleted = this.isGameCompleted();
    this.setState({
      score: this.state.score.map(
        (result, round) => (round === this.state.round ? true : result)
      ),
      round: this.state.round + 1
    });
    if (!isGameCompleted) {
      setTimeout(this.resetGame, 1200);
    }
  };

  render() {
    const expressions = this.state.expressions.map((expression, position) => (
      <Expression
        value={expression.result}
        key={`${expression.firstOperand}-${
          expression.secondOperand
        }-${position}`}
        resolveRound={this.resolveRound}
      >
        {expression.firstOperand} + {expression.secondOperand}
      </Expression>
    ));
    return this.isGameCompleted() ? (
      <WellDone />
    ) : (
      <Board>
        <TargetSection>{expressions}</TargetSection>
        <ResultSection>
          <Result value={6} />
          <Result value={7} />
          <Result value={8} />
          <Result value={9} />
          <Result value={5} />
          <Result value={4} />
          <Result value={2} />
          <Result value={3} />
          <Result value={10} />
        </ResultSection>
        <CustomDragLayer snapToGrid={false} />
        <ScoreBoard score={this.state.score} />
      </Board>
    );
  }
}

export default Game;
