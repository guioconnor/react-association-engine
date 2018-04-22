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

    const expressions = range(ROUNDS_COUNT).map(() =>
      props.expressionGenerator(0)
    );

    this.state = {
      expressions: expressions,
      score: range(ROUNDS_COUNT).map(() => false),
      icons: slice(shuffle(ICONS), 0, ROUNDS_COUNT),
      results: props.resultsGenerator(0, expressions[0]),
      round: 0,
      level: 0
    };
  }

  isLevelCompleted = score => score.every(round => round === true);

  isGameCompleted = (score, level) =>
    this.isLevelCompleted(score) && level === LEVELS.length - 1;

  resetGame = () => {
    const expressions = range(ROUNDS_COUNT).map(() =>
      this.props.expressionGenerator(0)
    );

    this.setState({
      expressions: expressions,
      results: this.props.resultsGenerator(0, expressions[0]),
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
              round: newRound,
              results: this.props.resultsGenerator(
                0,
                this.state.expressions[newRound]
              )
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
    const {
      Expression,
      Result,
      resultsGenerator,
      randomiseResultsOnError
    } = this.props;
    const { expressions, icons, round, score, level } = this.state;

    const expression = expressions[round];
    const results = (randomiseResultsOnError
      ? resultsGenerator(level, expression)
      : this.state.results
    ).map(result => <Result value={result} />);

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
  Expression: PropTypes.func,
  Result: PropTypes.func,
  expressionGenerator: PropTypes.func,
  resultsGenerator: PropTypes.func
};

export default Game;
