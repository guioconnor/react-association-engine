import React from "react";

import { default as TouchBackend } from "react-dnd-touch-backend";
import { DragDropContext } from "react-dnd";

const Board = ({ children, ...props }) => (
  <div {...props} className="board">
    {children}
  </div>
);

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(
  Board
);
