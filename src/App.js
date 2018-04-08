import React, { Component } from "react";
import styled from "styled-components";
import { range, shuffle, slice } from "lodash";
import NoSleep from "nosleep.js";

import {
  ROUNDS_COUNT,
  TIMEOUT,
  MIN_RESULTS_COUNT,
  LEVELS,
  ICONS
} from "./config";

import Result from "./components/Result";
import Expression from "./components/Expression";
import Board from "./components/Board";
import CustomDragLayer from "./components/CustomDragLayer";
import WellDone from "./components/WellDone";
import ScoreBoard from "./components/ScoreBoard";

import generateAdditionExpression from "./lib/additions";

const TargetSection = styled.div``;

const ResultSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.noSleep = new NoSleep();

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
  componentWillUnmount = () => {
    this.noSleep.disable();
  };

  enableNoSleep = () => {
    this.noSleep.enable();
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
      this.state.expressions.map(expression => expression.value),
      ICONS
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
      <Board onClick={this.enableNoSleep}>
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
