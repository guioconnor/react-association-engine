import React, { Component } from "react";
import styled from "styled-components";
import { random, range, shuffle, slice } from "lodash";

import Result from "./Result";
import Expression from "./Expression";
import Board from "./Board";
import CustomDragLayer from "./CustomDragLayer";
import WellDone from "./WellDone";

/** Game constants */
const ROUNDS_COUNT = 12;
const TIMEOUT = 1200;
const MIN_RESULTS_COUNT = 6;
const LEVELS = [
  {
    showIcons: true,
    showValue: false,
    allowZero: false,
    maxValue: 10
  },
  {
    showIcons: true,
    showValue: true,
    allowZero: false,
    maxValue: 10
  },
  {
    showIcons: true,
    showValue: true,
    allowZero: true,
    maxValue: 10
  },
  {
    showIcons: false,
    showValue: true,
    allowZero: true,
    maxValue: 10
  }
];

const TargetSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const ResultSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const generateAdditionExpression = (
  allowZero,
  highestValue,
  exeptions = []
) => {
  let value;
  do {
    value = random(allowZero ? 0 : 2, highestValue);
  } while (exeptions.includes(value));
  const firstOperand = random(allowZero ? 0 : 1, value - (allowZero ? 0 : 1));
  const secondOperand = value - firstOperand;

  return {
    value,
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
  width: 100%;
  display: inline-block;
  background: ${props => (props.solved ? "orange" : "#eee")};
  flex: 1;
`;

const ScoreBoard = ({ score }) => {
  const scores = score.map((solved, position) => <Score solved={solved} />);
  return <StyledScore>{scores}</StyledScore>;
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expressions: [],
      results: [],
      score: range(ROUNDS_COUNT).map(() => false),
      round: 0,
      level: 0
    };
  }

  isLevelCompleted = score => score.every(round => round === true);
  isGameCompleted = (score, level) =>
    this.isLevelCompleted(score) && level === LEVELS.length - 1;

  componentWillMount = () => {
    this.resetExpression();
  };

  resetGame = () => {
    this.setState(
      {
        expressions: [],
        results: [],
        score: range(ROUNDS_COUNT).map(() => false),
        round: 0,
        level: 0
      },
      () => {
        this.resetExpression();
      }
    );
  };

  resetExpression = () => {
    const expression = generateAdditionExpression(
      LEVELS[this.state.level].allowZero,
      LEVELS[this.state.level].maxValue,
      this.state.expressions.map(expression => expression.value)
    );
    const results = shuffle(
      [expression.value].concat(
        slice(
          shuffle(
            range(1, LEVELS[this.state.level].maxValue + 1).filter(
              value => value !== expression.value
            )
          ),
          0,
          MIN_RESULTS_COUNT - 1
        )
      )
    );
    this.setState({ expressions: [expression], results });
  };

  resolveRound = () => {
    let newScore = this.state.score.map(
      (result, round) => (round === this.state.round ? true : result)
    );
    let newLevel = this.state.level;
    let newRound = this.state.round + 1;

    const isLevelCompleted = this.isLevelCompleted(newScore);
    const isGameCompleted = this.isGameCompleted(newScore, this.state.level);

    if (isLevelCompleted && !isGameCompleted) {
      newScore = newScore.map(round => false);
      newLevel += 1;
      newRound = 0;
    }

    this.setState({
      score: newScore,
      level: newLevel,
      round: newRound
    });
    if (!isGameCompleted) {
      setTimeout(this.resetExpression, TIMEOUT);
    }
  };

  render() {
    const expressions = this.state.expressions.map((expression, position) => (
      <Expression
        expression={expression}
        value={expression.value}
        key={`${expression.firstOperand}-${
          expression.secondOperand
        }-${position}`}
        resolveRound={this.resolveRound}
        showIcons={LEVELS[this.state.level].showIcons}
        showValue={LEVELS[this.state.level].showValue}
      />
    ));

    const results = this.state.results.map(result => <Result value={result} />);

    return this.isGameCompleted(this.state.score, this.state.level) ? (
      <WellDone onReset={this.resetGame} />
    ) : (
      <Board>
        <TargetSection className="expressions-section">
          {expressions}
        </TargetSection>
        <ResultSection className="results-section">{results}</ResultSection>
        <CustomDragLayer snapToGrid={false} />
        <ScoreBoard score={this.state.score} className="progress-section" />
      </Board>
    );
  }
}

export default Game;
