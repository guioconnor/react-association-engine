import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { range } from "lodash";
import styled from "styled-components";

import itemTypes from "./itemTypes";

const StyledExpression = styled.div`
  font-size: 12vw;
  text-align: center;
  padding: 15px;
`;

const StyledIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5.5vw;
`;

const StyledIcons = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 5.5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Value = styled.span`
  position: absolute;
  text-shadow: 1px 1px 2px black;
  color #333;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20vw;
  opacity: 0.8;
`;

const Icons = ({ value, icon }) => (
  <StyledIcons>
    {value < 10 && range(value).map(() => <StyledIcon>{icon}</StyledIcon>)}
  </StyledIcons>
);

const StyledOperand = styled.span`
  position: relative
  height: 21vw;
  width: 21vw;
  display: inline-block;
  background: #eee;
  border-radius: 1vw;
  vertical-align: middle;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  `;

const Operand = ({ value, showIcons = false, showValue = true, icon }) => (
  <StyledOperand>
    {showIcons && <Icons value={value} icon={icon} />}
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
