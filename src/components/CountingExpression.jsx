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
      expressionSolved: false
    };
  }

  onSolveOperand = isSolved => {
    if (!isSolved) {
      this.props.onFailedAnswer();
    } else {
      this.setState({ expressionSolved: isSolved });
      this.props.resolveRound();
    }
  };

  render() {
    const { expression, icon } = this.props;
    return (
      <div>
        <StyledExpression>
          <Operand
            value={expression.value}
            showIcons={true}
            showValue={this.state.expressionSolved}
            solved={this.state.expressionSolved}
            icon={icon}
            onSolve={this.onSolveOperand}
            canDropByTurn={true}
          />
        </StyledExpression>
      </div>
    );
  }
}

export default Expression;
