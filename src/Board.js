// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //null check
      if (rowIndex === undefined || !(this._isInBounds(rowIndex, 0))) {
        return false;
      }
      //iterate through entire row
      var row = this.rows()[rowIndex];
        // this.get(rowIndex);
      var counter = 0;
        //keep track of number of 1s
      for (var i = 0; i < row.length; i++) {
        if (row[i]) {
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate over each row
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        //if any row has a conflict, return true
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // null check
      if (colIndex === undefined || !(this._isInBounds(0, colIndex))) {
        return false;
      }
      var counter = 0;
      for (var i = 0; i < this.rows().length; i++) {
        // march through rows at same col
        if (this.get(i)[colIndex]) {
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // iterate from  0 - n
      // check each index 
      var colCount = this.rows().length;
      for (var i = 0; i < colCount; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) { 
      var head = majorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      var currRow;
      var currCol;
      
      // null check
      if (Math.abs(head) >= this.rows().length || head === undefined) {
        return null;
      }
      // treat the parameter differently based on if it's 0, neg, or pos num
      if (head >= 0) {
        currRow = 0;
        currCol = head;
      }
      if (head < 0) {
        currRow = -head;
        currCol = 0;
      }
      //iterate over box --> start loop at currRow; end loop at num of rows/cols that exist; 
      for (var i = currRow; i < this.rows().length; i++) {
        if (this.get(i)[currCol]) {
          counter++;
        }
        currCol++;
      }
      // stop checking for next diag right (in next row) when it hits an undefined
      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var maxBoardIndex = this.rows().length - 1;
      //iterate over each diagonal
      for (var i = -maxBoardIndex; i <= maxBoardIndex; i++) {
        //check for conflict and return if so
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var head = minorDiagonalColumnIndexAtFirstRow;
      var counter = 0;
      var maxBoardIndex = this.rows().length - 1;
      var currRow;
      var currCol;
      
      // null check
      if (head < 0 || head > maxBoardIndex * 2 || head === undefined) {
        return null;
      }
      
      // head will be a num from 0 to (2 * maxBoardIndex of box)
      if (head > maxBoardIndex) {
        currRow = head - maxBoardIndex;
        currCol = maxBoardIndex;
      }
      if (head <= maxBoardIndex) {
        currRow = 0;
        currCol = head;
      }
      // loop start from curr row, end when run out rows (is when curr row = head! fancy!)
      for (var i = currRow; i < this.rows().length; i++) {
        // check the currCol index inside currRow
        if (this.get(i)[currCol]) {
        // increment counter if conflict found
          counter++;
        }
        // decrement currCol
        currCol--;
      }
      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var maxBoardIndex = this.rows().length - 1;
      for (var i = 0; i <= (maxBoardIndex * 2); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
