const sketchArea = document.querySelector("#sketchArea");
const rowInput = document.querySelector("#rowInput");
const columnInput = document.querySelector("#columnInput");
const inputArea = document.querySelector("#layoutCustomizingArea .inputArea");


let rows = 10;
let columns = 10;
const gridSize = Math.floor(window.innerWidth / 2);

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



createSketchGrid();
resetInput();
