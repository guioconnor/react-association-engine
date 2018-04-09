import React, { Component } from "react";
import styled from "styled-components";

import Operand from "./Operand";

const StyledExpression = styled.div`
  font-size: 12vw;
  text-align: center;
  padding: 15px;
`;

class Expression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOperandSolved: false,
      secondOperandSolved: false,
      expressionSolved: false
    };
  }

  onSolveOperand = operand => isSolved => {
    !this.state[operand] && this.setState({ [operand]: isSolved });
    this.state.expressionSolved && this.props.resolveRound();
  };

  render() {
    const { expression } = this.props;
    return (
      <div>
        <StyledExpression>
          <Operand
            value={expression.firstOperand}
            showIcons={this.props.showIcons}
            showValue={this.state.firstOperandSolved}
            solved={this.state.firstOperandSolved}
            icon={expression.icon}
            onSolve={this.onSolveOperand("firstOperandSolved")}
            canDropByTurn={!this.state.firstOperandSolved}
          />{" "}
          +{" "}
          <Operand
            value={expression.secondOperand}
            showIcons={this.state.firstOperandSolved}
            showValue={this.state.secondOperandSolved}
            solved={this.state.secondOperandSolved}
            icon={expression.icon}
            onSolve={this.onSolveOperand("secondOperandSolved")}
            canDropByTurn={
              this.state.firstOperandSolved && !this.state.secondOperandSolved
            }
          />
          {` = `}
          <Operand
            value={expression.value}
            showIcons={this.state.expressionSolved}
            showValue={this.state.expressionSolved}
            solved={this.state.expressionSolved}
            icon={expression.icon}
            onSolve={this.onSolveOperand("expressionSolved")}
            canDropByTurn={
              this.state.secondOperandSolved && !this.state.expressionSolved
            }
          />
        </StyledExpression>
      </div>
    );
  }
}

export default Expression;
