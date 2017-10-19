/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// inputs: a number that represents the size of the board (not the max index!)
// outputs: return an array of arrays (a matrix). this gets picked up by the Board constructor and converted into a Backbone object. we don't need to worry about that!
// [
// [1, 0, 0, 0],
// [0, 1, 0, 0],
// [0, 0, 1, 0],
// [0, 0, 0, 1]
// ]
// constraints: n should be positive. we will test n from 1 - 8;
  // rooks experience conflicts if they share a column or a row. luckily we have  those functions!
// edge cases:




window.findNRooksSolution = function(n) {
  //create a new Board
  var board = new Board({'n': n});
  //initialize startRow, startCol as 0
  var r = 0;
  //two loops, one for r, one for c; increment
    //place rooks until we run out of rows (startRow = n)
  while (r < n) {
    var c = 0;
    while (c < n) {
  //place a rook
      board.togglePiece(r, c);
    //check for conflicts
      if (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
      //else, exit and place new rook at (row,col+1) and start over
        board.togglePiece(r, c);
        c++;
      } else {
      //if none, continue
        break;
      }
    }
    //increment row
    r++;
    // reset c so that all solutions will be found, regardless of start col
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create a new Board
  var solvedBoard;
    //place rooks until we run out of rows (startRow = n)
  var placeQueens = function(startRow, startCol) {
    var board = new Board({'n': n});
    console.log('round: ' + startCol);
    // if startRow or startCol out of bounds, quit the function.
    if (startCol === n) {
      return board;
    }
    var r = startRow;
    var c = startCol;
    // while row is in bounds
    while (r < n) {
      // while col is in bounds
      while (c < n) {
        console.log('current loc: ' + r + ',' + c);
        //place a queen
        board.togglePiece(r, c);
        //check for all conflicts
        if (board.hasAnyColConflicts() || 
            board.hasAnyRowConflicts() || 
            board.hasAnyMajorDiagonalConflicts() ||
            board.hasAnyMinorDiagonalConflicts()) {
        // if yes, take queen off, look at next col, and start round over
          board.togglePiece(r, c);
          c++;
        } else {
        //if none, we can move on to next round by ***
          break;
        }
      }
      // if at any point, we have looked at all col of a row and we find nowhere without conflicts
      if (c === n && r < n) {
        // and try from the beginning, startRow = 0, startCol = startCol+1;
        board = placeQueens(startRow, startCol + 1);
        return board;
      }
      // *** looking at the next row
      r++;
      // always starting at the first column
      c = 0;
      console.log('next loc: ' + r + ',' + c);
      if (r === n) {
        return board;
      }
    }
  };
  
  solvedBoard = placeQueens(0, 0);
  
  var solution = solvedBoard.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
