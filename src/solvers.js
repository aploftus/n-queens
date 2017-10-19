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
  var c = 0;
  //place a rook
  
    
  //two loops, one for r, one for c; increment
  
    //check for conflicts
      //if none, continue
      //else, exit and place new rook at (row,col+1) and start over
    //place rooks until we run out of rows (startRow = n)
    //increment row
    
  while (r < n) {
    while (c < n) {
      board.togglePiece(r, c);
      if (board.hasAnyColConflicts()) {
        board.togglePiece(r, c);
        c++;
      } else {
        break;
      }
    }
    // c++;
    r++;
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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
