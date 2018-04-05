import React from "react";
import { DragLayer } from "react-dnd";
import { get } from "lodash";

// import ItemTypes from "./itemTypes";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x + 30}px, ${y + 10}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

const boxStyle = {
  borderRadius: "1vw",
  background: "Lavender",
  display: "inline-block",
  padding: "15px 30px 0 30px",
  fontSize: "5.5vw",
  lineHeight: "10vw",
  opacity: ".8",
  lineHeight: "1"
};

const CustomElement = props => {
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>
        <div style={boxStyle}>{get(props, "item.value", "")}</div>
        {/* <Card>{get(props, "item.value", "")}</Card> */}
      </div>
    </div>
  );
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomElement);
