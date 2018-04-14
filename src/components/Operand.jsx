import React from "react";
import { DropTarget } from "react-dnd";
import styled from "styled-components";
import { get } from "lodash";

import ValueBox from "./ValueBox";
import IconsBox from "./IconsBox";
import itemTypes from "./itemTypes";

const StyledOperand = styled.div`
  position: relative
  height: 21vw;
  width: 21vw;
  display: inline-block;
  background: #eee;
  border-radius: 1vw;
  vertical-align: middle;
  box-shadow: 0.3vw 0.3vw 1vw rgba(0, 0, 0, 0.1),
    -0.1vw -0.1vw 0.3vw rgba(0, 0, 0, 0.05);
`;

const Operand = ({
  value,
  showIcons = false,
  showValue = true,
  icon,
  solved,
  connectDropTarget,
  canDrop,
  canDropByTurn,
  isOver
}) =>
  connectDropTarget(
    <span
      style={{
        height: "21vw",
        width: "21vw",
        display: "inline-block"
      }}
    >
      <StyledOperand
        style={{
          opacity: 0.9,
          background: solved || !canDropByTurn ? "#6d6466" : "#ffb52e"
        }}
      >
        {showIcons && <IconsBox value={value} icon={icon} />}
        {showValue && <ValueBox>{value}</ValueBox>}
      </StyledOperand>
    </span>
  );

const operandTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    props.onSolve(item.value === props.value);
  },
  canDrop(props, monitor) {
    return get(props, "canDropByTurn", true);
  }
};

const operandCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

const TargetOperand = DropTarget(
  itemTypes.RESULT,
  operandTarget,
  operandCollect
)(Operand);

export default TargetOperand;
