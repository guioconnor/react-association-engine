import { default as TouchBackend } from "react-dnd-touch-backend";
import { DragDropContext } from "react-dnd";
import styled from "styled-components";

const Board = DragDropContext(
  TouchBackend({ enableMouseEvents: true })
)(styled.div`
  padding: 30px;
`);

export default Board;
