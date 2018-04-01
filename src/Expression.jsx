import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import itemTypes from "./itemTypes";
import Card from "./Card";

class Expression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      found: false,
      tried: false
    };
  }

  render() {
    const { children, value, connectDropTarget, isOver, canDrop } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div>
        <Card
          style={{
            background: this.state.found
              ? "#ccffcc"
              : this.state.tried ? "#ffcccc" : isActive ? "#ddc" : "#ccc"
          }}
        >
          {children}
          {` = `}
          {this.state.found && `${value}`}
        </Card>
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
