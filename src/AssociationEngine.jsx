import React, { Component } from "react";
import PropTypes from "prop-types";
import { range, shuffle, slice } from "lodash";

import { ROUNDS_COUNT, TIMEOUT, LEVELS, ICONS } from "./config";

import Board from "./components/Board";
import CustomDragLayer from "./components/CustomDragLayer";
import WellDone from "./components/WellDone";
import ScoreBoard from "./components/ScoreBoard";
import TargetSection from "./components/TargetSection";
import ResultSection from "./components/ResultSection";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expressions: range(ROUNDS_COUNT).map(() =>
        this.props.expressionGenerator(0)
      ),
      score: range(ROUNDS_COUNT).map(() => false),
      icons: slice(shuffle(ICONS), 0, ROUNDS_COUNT),
      round: 0,
      level: 0
    };
  }

  isLevelCompleted = score => score.every(round => round === true);

  isGameCompleted = (score, level) =>
    this.isLevelCompleted(score) && level === LEVELS.length - 1;

  resetGame = () => {
    this.setState({
      expressions: range(ROUNDS_COUNT).map(() =>
        this.props.expressionGenerator(0)
      ),
      results: [],
      score: range(ROUNDS_COUNT).map(() => false),
      round: 0,
      level: 0
    });
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

    this.setState(
      {
        score: newScore
      },
      () => {
        if (!isGameCompleted) {
          setTimeout(() => {
            this.setState({
              level: newLevel,
              round: newRound
            });
          }, TIMEOUT);
        }
      }
    );
  };

  randomizeAnswers = () => {
    const results = this.props.resultsGenerator(
      this.state.level,
      this.state.expressions[0]
    );
    this.setState({ results });
  };

  render() {
    const { Expression, Result, resultsGenerator } = this.props;
    const { expressions, icons, round, score, level } = this.state;

    const expression = expressions[round];
    const results = resultsGenerator(level, expression).map(result => (
      <Result value={result} />
    ));

    return (
      <Board>
        <TargetSection className="expressions-section">
          <Expression
            expression={expression}
            key={round}
            icon={icons[round]}
            resolveRound={this.resolveRound}
            showIcons={LEVELS[level].showIcons}
            showValue={LEVELS[level].showValue}
            onFailedAnswer={this.randomizeAnswers}
          />
        </TargetSection>
        <ResultSection className="results-section"> {results} </ResultSection>
        <CustomDragLayer snapToGrid={false} />
        <ScoreBoard
          score={score}
          icons={icons}
          className="progress-section"
          round={round}
        />
        {this.isGameCompleted(score, level) && (
          <WellDone onReset={this.resetGame} />
        )}
      </Board>
    );
  }
}

Game.propTypes = {
  Expression: PropTypes.element,
  Result: PropTypes.element,
  expressionGenerator: PropTypes.func,
  resultsGenerator: PropTypes.func
};

export default Game;
