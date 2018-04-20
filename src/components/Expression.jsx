import React, { Component } from "react";
import styled from "styled-components";

import Operand from "./Operand";
import Operator from "./Operator";

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
    if (!isSolved) {
      this.props.onFailedAnswer();
    }
    !this.state[operand] && this.setState({ [operand]: isSolved });
    this.state.expressionSolved && this.props.resolveRound();
  };

  render() {
    const { expression, icon } = this.props;
    return (
      <div>
        <StyledExpression>
          <Operand
            value={expression.firstOperand}
            showIcons={true}
            showValue={this.state.firstOperandSolved}
            solved={this.state.firstOperandSolved}
            icon={icon}
            onSolve={this.onSolveOperand("firstOperandSolved")}
            canDropByTurn={!this.state.firstOperandSolved}
          />
          <Operator operation={expression.operation} />
          <Operand
            value={expression.secondOperand}
            showIcons={this.state.firstOperandSolved}
            showValue={this.state.secondOperandSolved}
            solved={this.state.secondOperandSolved}
            icon={icon}
            onSolve={this.onSolveOperand("secondOperandSolved")}
            canDropByTurn={
              this.state.firstOperandSolved && !this.state.secondOperandSolved
            }
          />
          <Operator operation="IDENTITY" />
          <Operand
            value={expression.value}
            showIcons={this.state.expressionSolved}
            showValue={this.state.expressionSolved}
            solved={this.state.expressionSolved}
            icon={icon}
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
