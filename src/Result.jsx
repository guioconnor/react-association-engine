import React, { Component } from "react";
import { DragSource } from "react-dnd";
import styled from "styled-components";
import itemTypes from "./itemTypes";

const Card = styled.div`
  border-radius: 1vw;
  background: #ccc;
  line-height: 10vw;
  min-width: 10vw;
  font-size: 5.5vw;
  margin: 5px;
  text-align: center;
  flex: 1;
`;

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
