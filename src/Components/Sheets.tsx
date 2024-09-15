import React, { useEffect, useRef } from "react";
import {
  calculateRowsAndColToDisplay,
  resizeCanvas,
} from "../utils/Sheet.utils";

export const Sheets = () => {
  const canvasRef = useRef(null);

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  const cellWidth = 100;
  const cellHeight = 22;

  const {
    visible: visibleColumns,
    start: columnsStart,
    end: columnsEnd,
  } = calculateRowsAndColToDisplay(cellWidth, canvasWidth);
  const {
    visible: visibleRows,
    start: rowsStart,
    end: rowsEnd,
  } = calculateRowsAndColToDisplay(cellHeight, canvasHeight);
  // console.log(visibleColumns, visibleRows);
  // console.log(columnsStart, columnsEnd);
  // console.log(rowsStart, rowsEnd);

  useEffect(() => {
    // first we need to take the reference of the canvas to draw something on it
    let canvas = canvasRef.current;
    resizeCanvas(canvas);
    // then we need to select the tool of canvas to draw
    const context = canvas.getContext("2d");

    // create a complete rectangle for the canvas and added white color to it
    context.fillStyle = "white";
    // added dimension for the rectangle
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // draw col lines
    let startX = 0;

    // to draw vertical lines we need to write the for loop over the visibleColumns array
    for (let col of visibleColumns) {
      context.beginPath();
      // where to start drawing the lines
      context.moveTo(startX, 0);
      // where to end
      context.lineTo(startX, context.canvas.height);
      // Draw line
      context.stroke();

      startX += cellWidth;
    }

    let startY = 0;

    // to draw horizontal lines we need to write the for loop over the visibleRows array
    for (let row of visibleRows) {
      context.beginPath();
      // where to start drawing the lines
      context.moveTo(0, startY);
      // where to end
      context.lineTo(context.canvas.width, startY);
      // Draw line
      context.stroke();

      startY += cellHeight;
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "red" }}>
      <canvas
        ref={canvasRef}
        style={{
          height: canvasHeight,
          width: canvasWidth,
          backgroundColor: "yellow",
        }}
      />
    </div>
  );
};
