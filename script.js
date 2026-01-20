//class for puzzles
class Puzzle {
    solution = "0000000000000000000000000";
    hintValues = ["", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]; 
    name = "default";
    category = "other";
    //array of puzzles, for easy selection
    static puzzles = [];
    static kanji = [];
    static sherlockian = [];
    static utdr = [];
    static other = [];
    
    constructor(solution, hintValues, name, category) {
        this.solution = solution;
        this.hintValues = hintValues;
        this.name = name;
        this.category = category;
        Puzzle.puzzles.push(this);
        switch(category) {
            case "kanji":
                Puzzle.kanji.push(this);
                break;
            case "sherlockian":
                Puzzle.sherlockian.push(this);
                break;
            case "utdr":
                Puzzle.utdr.push(this);
                break;
            default:
                Puzzle.other.push(this);
                break;
        }
    }
}

//constants from html
const boxes = document.querySelectorAll(".puzzle div.grid");
const hints = document.querySelectorAll(".puzzle div.border");
const result = document.querySelector("#result");
const buttonCheck = document.querySelector("button.check");
const buttonReset = document.querySelector("button.reset");
const buttonGo = document.querySelector("button.go");

//puzzles
//const circlePuzzle = new Puzzle("0000001110010100111000000", ["", "0", "3", "1<br>1", "3", "0", "0", "3", "1, 1", "3", "0"], "circle");
//const mugPuzzle = new Puzzle("0000011111111011110111111", ["", "4", "4", "4", "1<br>1", "4", "0", "5", "3, 1", "3, 1", "5"], "mug");
//const kiPuzzle = new Puzzle("0010011111001000111010101", ["", "1<br>1", "1<br>1", "5", "1<br>1", "1<br>1", "1", "5", "1", "3", "1, 1, 1"], "木 (tree)");
//const hiPuzzle = new Puzzle("0111101001011110100101111", ["", "0", "5", "1<br>1<br>1", "1<br>1<br>1", "5", "4", "1, 1", "4", "1, 1", "4"], "日 (sun)");
const heart = new Puzzle("0000000000011000110011110111101111111110111111111001111111000111111100001111100000011100000000100000", ["", "3", "6", "7", "7", "7", "7", "7", "6", "3", "0", "0", "2, 2", "4, 4", "9", "9", "7", "7", "5", "3", "1"], "heart", "utdr");
const ki = new Puzzle("0000110000000011000000001100001111111111111111111100011110000011111100011011011011001100111000110001", ["", "2<br>2", "2<br>2", "2<br>2", "4", "10", "10", "4", "2<br>2", "2<br>2", "2<br>2", "2", "2", "2", "10", "10", "4", "6", "2, 2, 2", "2, 2, 2", "1, 2, 1"], "木 (tree)", "kanji");
const dino = new Puzzle("0011000000001100000011110000000001000000000110000000011111000001111111000011100000000100000000110000", ["", "1", "1", "3", "7", "4<br>1", "5", "3", "2", "1", "1", "2", "2", "4", "1", "2", "5", "7", "3", "1", "2"], "dinosaur", "other");
//const glass = new Puzzle("0000111100000100001000010000100001000010000100001000011111000011000000011000000011000000001000000000", ["", "2", "2", "2", "6", "1<br>1", "1<br>1", "1<br>1", "1<br>1", "4", "0", "4", "1, 1", "1, 1", "1, 1", "1, 1", "5", "2", "2", "2", "1"], "magnifying glass");
const pipe = new Puzzle("0000000010000000010000000000100000000000111000111110110011110001111111000001111100000001100000000000", ["", "2", "1", "2", "2", "1", "2", "4", "1<br>5", "1<br>1<br>5", "4", "1", "1", "1", "0", "3, 4", "1, 2, 4", "7", "5", "2", "0"], "pipe", "sherlockian");
const topHat = new Puzzle ("0000000000000111110000011111000001111100000111110000011111000001111100011000001101111111110000000000", ["", "0", "2", "2", "6<br>1", "6<br>1", "6<br>1", "6<br>1", "6<br>1", "2", "2", "0", "5", "5", "5", "5", "5", "5", "2, 2", "9", "0"], "top hat", "sherlockian");
const bowler = new Puzzle ("0000000000000011100000010111000010111110001111111000111111100100111001011100011100111111100000000000", ["", "0", "2", "3<br>2", "1<br>2<br>2", "1<br>4<br>1", "6<br>1", "6<br>1", "4<br>2", "3<br>2", "2", "0", "3", "1, 3", "1, 5", "7", "7", "1, 3, 1", "3, 3", "7", "0"], "bowler hat", "sherlockian");
const mtt = new Puzzle ("0011111110001101011000101010100011010110011010101110111111100011111010001111111000000100000000010000", ["", "1", "1", "8", "2<br>1<br>3", "1<br>1<br>4", "2<br>1<br>5", "1<br>1<br>4", "2<br>1<br>1<br>1", "8", "1", "7", "2, 1, 2", "1, 1, 1, 1", "2, 1, 2", "2, 1, 1, 2", "1, 7", "5, 1", "7", "1", "1"], "mettaton", "utdr");

//variables
let currentPuzzle;
let currentHintValues;
let currentSolution;

//functions
function toggleBox(e) {
    if (e.target.classList.contains("clicked") == false && e.target.classList.contains("exed") == false) {
        e.target.classList.add("clicked");
    } else if (e.target.classList.contains("clicked")) {
        e.target.classList.remove("clicked");
        e.target.classList.add("exed");
    } else if (e.target.classList.contains("exed")){
        e.target.classList.remove("exed");
    }
    
}

/*function toggleBox(e) {
    e.target.classList.toggle("exed");
    e.target.classList.remove("clicked");
}*/

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
        if (box.classList.contains("exed")) {
            box.classList.remove("exed");
        }
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
        if (box.classList.contains("exed")) {
            box.classList.remove("exed");
        }
        box.addEventListener("click", toggleBox);
    })
    getNewPuzzle();
}

function fillPuzzleSelect() {

}

//main code


getNewPuzzle();

boxes.forEach((box) => {
    box.addEventListener("click", toggleBox);
})

buttonCheck.addEventListener("click", checkAnswer);
buttonReset.addEventListener("click", resetPuzzle);
    