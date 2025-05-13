const sketchArea = document.querySelector("#sketchArea");

function createSketchGrid(height, width) {
    for (let i = 0; i < height; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < width; j++) {
            const singleField = document.createElement('div');
            singleField.innerText = "<>";
            singleField.classList.add('singleField');
            row.appendChild(singleField);
        }
        sketchArea.appendChild(row);
    }
}

createSketchGrid(5, 5);