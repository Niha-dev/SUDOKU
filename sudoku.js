var numSelected = null;
var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    // Create number buttons 1-9
    for (let d = 1; d <= 9; d++) {
        const digit = document.createElement("div");
        digit.classList.add("digit");
        digit.innerText = d;
        digit.addEventListener("click", () => {
            if (numSelected) numSelected.classList.remove("selected");
            numSelected = digit;
            numSelected.classList.add("selected");
        });
        document.getElementById("digits").appendChild(digit);
    }

    // Create Sudoku board
    const boardElement = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            cell.id = `cell-${i}-${j}`;
            cell.classList.add("cell");

            if (board[i][j] !== "-") {
                cell.innerText = board[i][j];
                cell.classList.add("fixed");
            }

            // Click event for empty cell
            cell.addEventListener("click", () => {
                if (!numSelected || cell.classList.contains("fixed")) return;

                const selectedNum = numSelected.innerText;
                const correctNum = solution[i][j];

                if (selectedNum === correctNum) {
                    cell.innerText = selectedNum;
                    cell.classList.add("correct");
                } else {
                    cell.innerText = selectedNum;
                    cell.classList.add("error");
                    errors++;
                    document.getElementById("errors").innerText = errors;

                    // Clear wrong entry after short delay
                    setTimeout(() => {
                        cell.innerText = "";
                        cell.classList.remove("error");
                    }, 500);
                }
            });

            row.appendChild(cell);
        }
        boardElement.appendChild(row);
    }
};
