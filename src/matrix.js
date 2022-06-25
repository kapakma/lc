/**
 * 48. Rotate Image
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    rotateHelper(matrix, 0, 0, matrix.length - 1, 0);
    return matrix;
    
    function rotateHelper(matrix, row, col, n, cycle) {
        if (n - row > 0) {
            for (let i = col; i < n; i++) {
                const temp = matrix[row][i];                
                matrix[row][i] = matrix[n - (i - cycle)][col];
                matrix[n - (i-cycle)][col] = matrix[n][n - (i - cycle)];
                matrix[n][n - (i-cycle)] = matrix[i][n];
                matrix[i][n] = temp; 
            }
            
            rotateHelper(matrix, row+1, col+1, n-1, cycle+1);
        }
    }
};


/**
 * 54. Spiral Matrix
 * 
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const results = [];
    spiralHelper(matrix, 0, 0, matrix.length - 1, matrix[0].length - 1, results);
    return results;
    
    //recursive helper
    function spiralHelper(matrix, startRow, startCol, numRows, numCols, results) {
        let i, j;

        //traverse right
        for (i = startRow, j = startCol; j <= numCols; j++) {
            results.push(matrix[i][j]);
        }

        if (isComplete(results)) {
            return;
        }

        //traverse down
        for (i = startRow + 1, j--; i <= numRows; i++) {
            results.push(matrix[i][j]);
        }

        if (isComplete(results)) {
            return;
        }

        //traverse left
        for (i--, j--; j >= startCol; j--) {
            results.push(matrix[i][j]);
        }         

        if (isComplete(results)) {
            return;
        }

        //traverse up
        for (i--, j++; i > startRow; i--) {
            results.push(matrix[i][j]);
        }

        if (isComplete(results)) {
            return;
        }

        //call again with reduced matrix
        spiralHelper(matrix, startRow + 1, startCol + 1, numRows - 1, numCols - 1, results);
    }
    
    //check if results array reached matrix size
    function isComplete(arr, size) {
        return arr.length === (matrix.length * matrix[0].length);
    }
};


/**
 * 73. Set Matrix Zeroes
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const rows = new Set(),
          cols = new Set();
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 0) {
                rows.add(i);
                cols.add(j);
            }
        }
    }
    
    for (const c of cols) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][c] = 0;
        }
    }
    
    for (const r of rows) {
        for (let j = 0; j < matrix[r].length; j++) {
            matrix[r][j] = 0;
        }
    }
    
    return matrix;
};


/**
 * 79. Word Search
 * 
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const coords = [
        [ 1, 0],
        [ 0, 1],        
        [-1, 0],                
        [ 0,-1],
    ];
    
    const visited = new Set();
    for (let i = 0, rows = board.length; i < rows; i++) {
        for (let j = 0, cols = board[0].length; j < cols; j++) {
            if (helper(i, j, board, word, 0, visited)) {
                return true;
            }
        }
    }
    
    return false;
    
    function helper(row, col, board, word, i, visited) {
        if (i == word.length) {
            return true;
        }
        
        const key = `${row}-${col}`;
        if (row < 0 || row >= board.length ||
            col < 0 || col >= board[0].length || 
            visited.has(key)) {
            return false;
        }
            
        visited.add(key);
            
        if (board[row][col] == word.charAt(i)) {
            for (const [r, c] of coords) {
                if (helper(row + r, col + c, board, word, i+1, visited)) {
                    return true;
                }
            }
        }
            
        visited.delete(key);

        return false;
    }
};