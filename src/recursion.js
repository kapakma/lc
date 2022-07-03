/**
 * 62. Unique Paths
 * 
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    return pathHelper(0, 0, m, n, new Map());
    
    function pathHelper(x, y, m, n, memo) {
        if (x == m-1 && y == n-1) {
            return 1;
        }
        
        if (x < m && y < n) {
            const key1 = getKey(x+1, y),
                  key2 = getKey(x, y+1);
            
            if (!memo.has(key1)) {
                memo.set(key1, pathHelper(x+1, y, m, n, memo));
            }
            
            if (!memo.has(key2)) {
                memo.set(key2, pathHelper(x, y+1, m, n, memo));
            }
            
            return memo.get(key1) + memo.get(key2);
        }
        
        return 0;
    }
    
    function getKey(i, j) {
        return `${i}-${j}`;
    }
};


/**
 * 70. Climbing Stairs
 * 
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    return helper(n, new Map());
    
    function helper(n, memo) {
        if (n < 2) {
            return 1;
        }

        if (n == 2) {
            return 2;
        }

        if (!memo.has(n-1)) {
            memo.set(n-1, helper(n-1, memo));
        }
        
        if (!memo.has(n-2)) {
            memo.set(n-2, helper(n-2, memo));
        }
        
        return memo.get(n-1) + memo.get(n-2);
    }
};


/**
 * 198. House Robber
 * 
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const memo = new Map();
    let max = 0;
    for (let i = nums.length-1; i >= 0; i--) {
        max = Math.max(max, robHelper(nums, i, memo));        
    }
    
    return max;
    
    
    function robHelper(arr, i, memo) {
        if (i+2 < arr.length) {
            if (!memo.has(i+2)) {
                memo.set(i+2,  robHelper(arr, i+2, memo));
            }
        }
        
        if (i + 3 < arr.length) {
            if (!memo.has(i+3)) {
                memo.set(i+3,  robHelper(arr, i+3, memo));
            }
        }
        
        return arr[i] + Math.max(memo.get(i+2) ? memo.get(i+2) : 0, 
                                 memo.get(i+3) ? memo.get(i+3) : 0);
    }
};