import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import styled from "styled-components";

import Operand from "./Operand";
import itemTypes from "./itemTypes";

const StyledExpression = styled.div`
  font-size: 12vw;
  text-align: center;
  padding: 15px;
`;

class Expression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: false,
      tried: false
    };
  }

  render() {
    const { expression, connectDropTarget, isOver, canDrop } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div>
        <StyledExpression
          style={{
            background: this.state.found
              ? "DarkSeaGreen"
              : this.state.tried
                ? "tomato"
                : isActive ? "SlateBlue" : "lavender"
          }}
        >
          <Operand
            value={expression.firstOperand}
            showIcons={this.props.showIcons}
            showValue={this.props.showValue}
            icon={expression.icon}
          />{" "}
          +{" "}
          <Operand
            value={expression.secondOperand}
            showIcons={this.props.showIcons}
            showValue={this.props.showValue}
            icon={expression.icon}
          />
          {` = `}
          <Operand value={this.state.found && expression.value} />
        </StyledExpression>
      </div>
    );
  }
}

const expressionTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (!component.state.found) {
      const found = item.value === props.value;
      if (found) {
        props.resolveRound(found);
      }
      component.setState({
        found: item.value === props.value,
        tried: true
      });
    }
  }
};

function expressionCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const TargetExpression = DropTarget(
  itemTypes.RESULT,
  expressionTarget,
  expressionCollect
)(Expression);

export default TargetExpression;
