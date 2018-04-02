import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { range } from "lodash";
import styled from "styled-components";

import itemTypes from "./itemTypes";

const StyledExpression = styled.div`
  font-size: 50px;
  text-align: center;
  padding: 15px;
`;

const StyledIcon = styled.span`
  font-size: 30px;
  padding: 2px;
`;

const StyledIcons = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 30px;
`;

const Value = styled.span`
  position: absolute;
  text-shadow: 1px 1px 2px black;
  color #333;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  opacity: 0.8;
`;

const Icons = ({ value }) => (
  <StyledIcons>
    {value < 10 && range(value).map(() => <StyledIcon>👅</StyledIcon>)}
  </StyledIcons>
);

const StyledOperand = styled.span`
  position: relative
  height: 115px;
  width: 115px;
  display: inline-block;
  background: #eee;
  border-radius: 5px;
  vertical-align: middle;
  `;

const Operand = ({ value, showIcons = false, showValue = true }) => (
  <StyledOperand>
    {showIcons && <Icons value={value} />}
    {showValue && <Value>{value}</Value>}
  </StyledOperand>
);

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
              ? "#ccffcc"
              : this.state.tried ? "#ffcccc" : isActive ? "#ddc" : "#ccc"
          }}
        >
          <Operand
            value={expression.firstOperand}
            showIcons={this.props.showIcons}
            showValue={this.props.showValue}
          />{" "}
          +{" "}
          <Operand
            value={expression.secondOperand}
            showIcons={this.props.showIcons}
            showValue={this.props.showValue}
          />
          {` = `}
          {this.state.found && <Operand value={expression.value} />}
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
