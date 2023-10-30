/* A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/
// importing user import library
// missed ({sigint: true});
const prompt = require("prompt-sync")({ sigint: true });
let assert = require("assert");

//board used to save current gameplay
let board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
  if (validateMove(position)) {
    board[position] = mark;
  }
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
  console.log("\n" + " " + board[1] + " | " + board[2] + " | " + board[3]);
  console.log(" ---------");
  console.log(" " + board[4] + " | " + board[5] + " | " + board[6]);
  console.log(" ---------");
  console.log(" " + board[7] + " | " + board[8] + " | " + board[9] + "\n");
}

// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
  if (!isNaN(position) && position >= "1" && position <= "9") {
    if (board[position] === " ") {
      return true; // position is a number and true
    } else {
      return false; // position is  filled
    }
  } else {
    return false; // Invalid input
  }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  for (let i = 0; i < winCombinations.length; i++) {
    let combination = winCombinations[i];
    let [a, b, c] = combination;

    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  for (position = 1; position <= 9; position++) {
    if (board[position] === " ") {
      return false;
    }
  }
  return true;
}
// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
  console.log("Player " + player + " turn ");
  let position = prompt("Enter your position (1-9): ");

  while (!validateMove(position)) {
    //
    console.log("Invalid position");
    position = prompt("Enter your position (1-9): ");
  }

  markBoard(position, player); //call the function to mark the board
  printBoard(); // call the funtion to print updated board

  if (checkWin(player)) {
    // call checkWin fucntion to check player won
    console.log("Player " + player + " WIN\n\n");
    winnerIdentified = true;
    return;
  }
  if (checkFull()) {
    // call checkfull function to check board is full
    console.log(" TIE !!!\n\n");
    winnerIdentified = true;
    return;
  }

  if (player === "X") {
    // switch player
    currentTurnPlayer = "O";
  } else {
    currentTurnPlayer = "X";
  }
}
// entry point of the whole program
console.log(
  "Game started: \n\n" +
    " 1 | 2 | 3 \n" +
    " --------- \n" +
    " 4 | 5 | 6 \n" +
    " --------- \n" +
    " 7 | 8 | 9 \n"
);

let winnerIdentified = false;
let currentTurnPlayer = "X";

while (!winnerIdentified) {
  playTurn(currentTurnPlayer);

  if (checkFull(currentTurnPlayer) || checkWin(currentTurnPlayer)) {
    let newRound = prompt("DO YOU WANT TO PLAY AGAIN? (Y/N): "); // Asking the user for a new game

    while (
      newRound !== "Y" &&
      newRound !== "y" &&
      newRound !== "N" &&
      newRound !== "n"
    ) {
      console.log(" Please enter 'Y/y' or 'N/n' ONLY !!.");
      newRound = prompt("DO YOU WANT TO PLAY AGAIN? (Y/N): ");
    }

    if (newRound === "Y" || newRound === "y") {
      // condition checking the input user

      board = {
        1: " ",
        2: " ",
        3: " ",
        4: " ",
        5: " ",
        6: " ",
        7: " ",
        8: " ",
        9: " ",
      };

      printBoard();
      winnerIdentified = false;
      currentTurnPlayer = "X";
    } else if (newRound === "N" || newRound === "n") {
      console.log("THANK YOU FOR PLAYING TIC TAC TOE :)\n\n");
      winnerIdentified = true;
    }
  }
}
// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
