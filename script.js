//class for puzzles
class Puzzle {
    solution = "0000000000000000000000000";
    hintValues = ["", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]; 
    name = "default"
    //array of puzzles, for easy selection
    static puzzles = [];
    
    constructor(solution, hintValues, name) {
        this.solution = solution;
        this.hintValues = hintValues;
        this.name = name;
        Puzzle.puzzles.push(this);
    }
}

//constants from html
const boxes = document.querySelectorAll(".puzzle div.grid");
const hints = document.querySelectorAll(".puzzle div.border");
const result = document.querySelector("#result");
const buttonCheck = document.querySelector("button.check");
const buttonReset = document.querySelector("button.reset");

//puzzles
const circlePuzzle = new Puzzle("0000001110010100111000000", ["", "0", "3", "1<br>1", "3", "0", "0", "3", "1, 1", "3", "0"], "circle");
const mugPuzzle = new Puzzle("0000011111111011110111111", ["", "4", "4", "4", "1<br>1", "4", "0", "5", "3, 1", "3, 1", "5"], "mug");
const kiPuzzle = new Puzzle("0010011111001000111010101", ["", "1<br>1", "1<br>1", "5", "1<br>1", "1<br>1", "1", "5", "1", "3", "1, 1, 1"], "木 (tree)");
const hiPuzzle = new Puzzle("0111101001011110100101111", ["", "0", "5", "1<br>1<br>1", "1<br>1<br>1", "5", "4", "1, 1", "4", "1, 1", "4"], "日 (sun)");

//variables
let currentPuzzle;
let currentHintValues;
let currentSolution;

//functions
function toggleBox(e) {
    e.target.classList.toggle("clicked");
}

function getNewPuzzle() {
    let puzzlePicker = Math.floor(Math.random() * (0 - Puzzle.puzzles.length) + Puzzle.puzzles.length);
    currentPuzzle = Puzzle.puzzles[puzzlePicker];
    currentHintValues = currentPuzzle.hintValues;
    currentSolution = currentPuzzle.solution;
    for (let i = 0; i < hints.length; i++) {
        hints[i].innerHTML = currentHintValues[i];
    }
}

function checkAnswer() {
    var answer = "";
    boxes.forEach((box) => {
        if (box.classList.contains("clicked")) {
            answer = answer.concat("1");
        } else {
            answer = answer.concat("0");
        }
    })
    if (currentSolution == answer) {
        result.innerHTML = "win<br>" + currentPuzzle.name;
    } else {
        result.innerHTML = "lose :(";
    }
    endPuzzle();
}

function endPuzzle() {
    buttonReset.style.display = "block";
    buttonCheck.style.display = "none";
    boxes.forEach((box) => {
        box.removeEventListener("click", toggleBox);
    })
}

function resetPuzzle () {
    buttonReset.style.display = "none";
    buttonCheck.style.display = "block";
    result.innerHTML = "";
    boxes.forEach((box) => {
        if (box.classList.contains("clicked")) {
            box.classList.remove("clicked");
        }
        box.addEventListener("click", toggleBox);
    })
    getNewPuzzle();
}

//main code

getNewPuzzle();

boxes.forEach((box) => {
    box.addEventListener("click", toggleBox);
})

buttonCheck.addEventListener("click", checkAnswer);
buttonReset.addEventListener("click", resetPuzzle);
    