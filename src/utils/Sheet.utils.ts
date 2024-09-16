// function for calculating the no of visible rows and cols
export const calculateRowsAndColToDisplay = (size, visibleArea, offset) => {
  // initialize an array to store the col or row
  const visible = [];

  // need to initialize two more arrays for having the start and end pointers of the rows and cols
  const start = [];
  const end = [];

  //  initializing a variable from where the col or row starts
  let idx = 0;
  let nextStart = offset;

  //  creating a loop to check where the col can be added inside the visible area or not
  while (nextStart < visibleArea) {
    // we need to add the col in the visible array
    visible.push(idx);
    start.push(nextStart);
    end.push(nextStart + size);

    idx++;
    // new nextStart of col or row can be get by adding the size of cell
    nextStart += size;
  }

  // and at the end we need to return the visible array.
  return { visible, start, end };
};

// we need to resize the canvas or else the drawn lines are not visible as per our device
export const resizeCanvas = (canvas) => {
  // getBoundingClientRect is used to get size and position of an element relative to its visible part of the web page
  const { width, height } = canvas.getBoundingClientRect();

  // we also need to rescale the width as per the ratio of the machine
  //  thus we need to calculate the device pixel ratio
  let ratio = window.devicePixelRatio;

  let newCanvasWidth = Math.round(width * ratio);
  let newCanvasHeight = Math.round(height * ratio);

  // obtain a 2D rendering context
  // need a tool for drawing
  let context = canvas.getContext("2d");
  canvas.width = newCanvasWidth;
  canvas.height = newCanvasHeight;

  // we need to multiply the current transformation matrix by a scaling matrix
  // which allow us to enlarge or shrink everything drawn on the canvas.
  context.scale(ratio, ratio);
};
