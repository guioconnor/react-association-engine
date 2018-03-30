import React, { Component } from "react";
import { DragSource } from "react-dnd";
import itemTypes from "./itemTypes";
import Card from "./Card";

class Result extends Component {
  render() {
    const { value, connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div>
        <Card style={{ opacity: isDragging ? 0.5 : 1 }}>{value}</Card>
      </div>
    );
  }
}

const resultSource = {
  beginDrag(props) {
    return { ...props };
  }
};

const resultCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

const DraggableResult = DragSource(
  itemTypes.RESULT,
  resultSource,
  resultCollect
)(Result);

export default DraggableResult;
