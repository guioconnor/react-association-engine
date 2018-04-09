import React from "react";
import { DropTarget } from "react-dnd";
import styled from "styled-components";
import { get } from "lodash";

import ValueBox from "./ValueBox";
import IconsBox from "./IconsBox";
import itemTypes from "./itemTypes";

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

const Operand = ({
  value,
  showIcons = false,
  showValue = true,
  icon,
  connectDropTarget
}) =>
  connectDropTarget(
    <span>
      <StyledOperand>
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
    return get(props, "canDrop", true);
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
