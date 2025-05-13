const sketchArea = document.querySelector("#sketchArea");
const rowInput = document.querySelector("#rowInput");
const columnInput = document.querySelector("#columnInput");
const inputArea = document.querySelector("#layoutCustomizingArea .inputArea");
const colorPaletteArea = document.querySelector("#colorPaletteArea");

let rows = 10;
let columns = 10;
const gridSize = Math.floor(window.innerWidth / 2);
let isShiftPressed = false;
const colorSelection = [
  "rgb(191,155,153)",
  "rgb(215,195,178)",
  "rgb(238,230,211)",
  "rgb(196,219,208)",
  "rgb(179,204,206)",
  "transparent",
];

let selectedColorOption;
let selectedColor = colorSelection[0];

function createColorPalette() {
  for (let i = 0; i < colorSelection.length; i++) {
    let colorOption = document.createElement("div");
    let colorOptionWrapper = document.createElement("div");
    colorOption.classList.add("colorOption");
    colorOptionWrapper.classList.add("colorOptionWrapper");
    colorOption.style.backgroundColor = colorSelection[i];
    colorPaletteArea.appendChild(colorOptionWrapper)
    colorOptionWrapper.appendChild(colorOption);
    if (i === 0) {
      selectedColorOption = colorOption;
    }
  }

  colorPaletteArea.addEventListener("click", (event) => {
    if (event.target.id !== "colorPaletteArea") {
      selectedColorOption.classList.remove("selectedColorOption");
      selectedColor = event.target.style.backgroundColor;
      selectedColorOption = event.target;
      selectedColorOption.classList.add("selectedColorOption");
    }
  });
}

function createSketchGrid() {
  sketchArea.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    sketchArea.appendChild(row);
  }
}

// taking input for amount of rows/columns
inputArea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const target = event.target;
    const inputValue = parseInt(target.value);
    const targetId = target.id;

    // preventing usage of non-integer / negative values, values over 50
    if (!Number.isInteger(inputValue) || inputValue <= 0 || inputValue > 50) {
      resetInput();
      if (inputValue <= 0 || inputValue > 50) {
        alert("Please input a value between 0 and 50!");
      }
      return;
    }

    if (targetId === "rowInput") {
      rows = inputValue;
      createSketchGrid();
    } else if (targetId === "columnInput") {
      columns = inputValue;
      createSketchGrid();
    }
  }
});

function resetInput() {
  rowInput.value = rows;
  columnInput.value = columns;
}

// tracking if shift key is pressed, so that combination with 'hover'-event is possible
document.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    isShiftPressed = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Shift") {
    isShiftPressed = false;
  }
});

sketchArea.addEventListener("mouseover", (event) => {
  const ElementToBeColored = event.target;

  // prevent main sketching area from being colored
  if (ElementToBeColored.id !== "sketchArea") {
    // coloring takes place if shift is pressed
    if (isShiftPressed) {
      ElementToBeColored.style.backgroundColor = selectedColor;
    }
  }
});

function initialize() {
  createSketchGrid();
  resetInput();
  createColorPalette();
  selectedColorOption.classList.add("selectedColorOption");
}

initialize();
