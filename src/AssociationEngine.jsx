import React, { Component } from "react";
import { range, shuffle, slice } from "lodash";

import { ROUNDS_COUNT, TIMEOUT, LEVELS, ICONS } from "./config";

import Result from "./components/Result";
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
      expressions: [],
      results: [],
      score: range(ROUNDS_COUNT).map(() => false),
      icons: slice(shuffle(ICONS), 0, ROUNDS_COUNT),
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
    const expression = this.props.expressionGenerator(this.state.level);
    const results = this.props.resultsGenerator(this.state.level, expression);

    this.setState({
      expressions: [expression],
      results
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
            this.resetExpression();
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
    const { Expression } = this.props;
    const expressions = this.state.expressions.map((expression, position) => (
      <Expression
        expression={expression}
        key={this.state.round}
        position={position}
        icon={this.state.icons[this.state.round]}
        resolveRound={this.resolveRound}
        showIcons={LEVELS[this.state.level].showIcons}
        showValue={LEVELS[this.state.level].showValue}
        onFailedAnswer={this.randomizeAnswers}
      />
    ));

    const results = this.state.results.map(result => <Result value={result} />);

    return (
      <Board onClick={this.enableNoSleep}>
        <TargetSection className="expressions-section">
          {" "}
          {expressions}{" "}
        </TargetSection>{" "}
        <ResultSection className="results-section"> {results} </ResultSection>{" "}
        <CustomDragLayer snapToGrid={false} />{" "}
        <ScoreBoard
          score={this.state.score}
          icons={this.state.icons}
          className="progress-section"
          round={this.state.round}
        />{" "}
        {this.isGameCompleted(this.state.score, this.state.level) && (
          <WellDone onReset={this.resetGame} />
        )}
      </Board>
    );
  }
}

export default Game;
