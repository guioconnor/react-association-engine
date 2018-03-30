import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragLayer } from "react-dnd";
import { get } from "lodash";
import ItemTypes from "../itemTypes";

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
  display: "inline-block",
  height: "50px",
  background: "#ccc",
  opacity: ".8",
  borderRadius: "5px",
  fontSize: "30px",
  lineHeight: "1",
  padding: "15px 30px 0 30px"
};

const CustomElement = props => {
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>
        <div style={boxStyle}>{get(props, "item.value", "")}</div>
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
