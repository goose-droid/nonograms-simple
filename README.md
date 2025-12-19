## Todo 

#### Puzzle done/submit
- [x] funtion to freeze puzzle after hitting submit
- [x] reset button => function to reset puzzle

#### bigger puzzles
- [] add columns and rows -- 5x5?

#### Multipuzzle support -- random
- [] class of puzzle, fields for solution and hints and name
- [] array of puzzle objects to select a random one from

#### Make look not like crap
- [] colors. fonts. arrangement on the page. etc.
- [x] figure out how to make border taller (top) or wider (left) to hold longer hints

### Extra
- Puzzle selector
- Puzzles with varying sizes (class field?)
    - js generates grid instead of it being in html
- automatically check against solution as puzzle is worked on.
    - check solution runs every time a box is clicked
    - ideally should only show incorrect if there's a 1 where there needed to be a 0, not if there's a mismatch at all.
- right click on box changes color but doesn't count for clicked. for draft/guess squares
    - alternatively, a click cycles through plain, "clicked", different color, X