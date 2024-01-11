import { DrawingBoard } from "./drawing-board/drawing-board.js";

const $app = document.getElementById("app");
const drawingBoardInstance = new DrawingBoard().mount($app);
