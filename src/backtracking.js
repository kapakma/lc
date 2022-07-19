/**
 * 17. Letter Combinations of a Phone Number
 * 
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits.length) {
        return [];
    }
    
    const map = {};
    let code = 'a'.charCodeAt(0);
    for (let i = 2; i <= 9; i++) {
        map[i] = new Array(i == 7 || i == 9 ? 4 : 3);
        for (let j = 0; j < map[i].length; j++) {
            map[i][j] = String.fromCharCode(code++);
        }
    }
    
    const results = [];
    comboHelper(0, '', results);
    return results;
    
    function comboHelper(i, str, results) {
        if (str.length == digits.length) {
            results.push(str);
            return;
        }
        
        const digit = digits.charAt(i),
              letters = map[digit];
        for (const ch of letters) {
            comboHelper(i + 1, str + ch, results);
        }
    }
};


/**
 * 22. Generate Parentheses
 * 
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const strLen = 2 * n,
        results = [];
    generateHelper('(', 1, 0);
    return results;
    
    function generateHelper(str, openBr, closeBr) {
        if (str.length === strLen) {
            results.push(str);
        }
        else if (openBr < n) {
            generateHelper(str + '(', openBr+1, closeBr);
            
            if (openBr > closeBr) {
                generateHelper(str + ')', openBr, closeBr+1);
            }
        }
        else {
            generateHelper(str + ')', openBr, closeBr+1);
        }
    }
};


/**
 * 40. Combination Sum II
 * 
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates.sort((a,b) => a-b);
    const results = [];
    comboSumHelper(target, 0, []);
    return results;
    
    function comboSumHelper(sum, index, combo) {
        if (sum > 0) {
            const set = new Set();
            for (let i = index; i < candidates.length; i++) {
                const val = candidates[i];
                if (!set.has(val)) {
                    set.add(val);
                    comboSumHelper(sum - val, i+1, [...combo, val]);
                }
            }    
        }
        else if (sum == 0) {
            results.push(combo);
        }
    }
};


/**
 * 46. Permutations
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const results = [];
    permuteHelper(nums, 0, results);
    return results;
    
    function permuteHelper(arr, i, results) {
        if (i < arr.length - 1) {
            for (let j = i; j < arr.length; j++) {
                const a = swap(arr, i, j);
                permuteHelper(a, i+1, results);
            }
        }
        else if (i == arr.length - 1) {
            results.push(arr);
        }
    }
    
    function swap(arr, i, j) {
        const clone = arr.slice(),
              temp = clone[i];
        clone[i] = clone[j];
        clone[j] = temp;
        return clone;
    }
};


/**
 * 47. Permutations II
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const results = [];
    permuteHelper(0, nums);
    return results;
    
    function permuteHelper(i, nums) {
        if (i < nums.length - 1) {
            const set = new Set();
            for (let j = i; j < nums.length; j++) {
                if (!set.has(nums[j])) {
                    set.add(nums[j]);
                    const arr = swap(nums, i, j);
                    permuteHelper(i+1, arr);
                }
            }
        }
        else {
           results.push(nums);
        }
    }
    
    function swap(arr, i, j) {
        arr = arr.slice();
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        return arr;
    }
};


/**
 * 77. Combinations
 * 
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const results = [];
    combineHelper([], 0);
    return results;
    
    function combineHelper(segment, i) {
        if (segment.length == k) {
            results.push(segment);
        }   
        else if (k - segment.length  <=  n - i) {
            for (let j = i; j < n; j++) {
                combineHelper([...segment, j+1], j+1);
            }
        }
    }
};


/**
 * 78. Subsets
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const results = [];
    subsetsHelper([], 0, nums, results);
    return results;
    
    function subsetsHelper(subarr, i, arr, results) {
        results.push(subarr);
        for (let j = i; i < nums.length; i++) {
            const temp = [...subarr, nums[i]];
            subsetsHelper(temp, i+1, arr, results);
        }
    }
};


/**
 * 90. Subsets II
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    nums.sort((a,b) => a-b);
    const results = [];
    subsetHelper([], 0);
    return results;
    
    function subsetHelper(seg, index) {
        results.push(seg);
        
        const set = new Set();
        for (let i = index; i < nums.length; i++) {
            const num = nums[i];
            if (!set.has(num)) {
                set.add(num);
                subsetHelper([...seg, num], i+1);
            }
        }
    }
};