/**
 * 1. Two Sum
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff) && map.get(diff) !== i) {
            return [i, map.get(diff)];
        }
    }
    
    return undefined;
};


/**
 * 11. Container With Most Water
 * 
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxArea = 0,
        left = 0,
        right = height.length - 1;
    
    while (left < right) {
        const w = right - left,
              h = Math.min(height[left], height[right]),
              area = w * h;
        
        maxArea = Math.max(maxArea, area);
        
        if (height[left] < height[right]) {
            left++;
        }
        else {
            right--;
        }
    }
    
    return maxArea;
};


/**
 * 53. Maximum Subarray
 * 
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    const dp = new Array(nums.length);
    let max = dp[0] = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        dp[i] = Math.max(num, dp[i-1] + num);
        max = Math.max(max, dp[i]);
    }   
    return max;
};


/**
 * 88. Merge Sorted Array
 * 
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i1 = 0,
        i2 = 0;

    while (i1 < m && i2 < n) {
        if (nums1[i1] > nums2[i2]) {
            shiftArray(nums1, i1);
            nums1[i1] = nums2[i2];
            i2++;
            m++;
        }
        i1++;
    }

    while (i2 < n) {
        nums1[i1++] = nums2[i2++];
    }

    function shiftArray(arr, start) {
        for (let j = arr.length-1; j > start; j--) {
            arr[j] = arr[j-1];
        }
        return arr;
    }
};


/**
 * 121. Best Time to Buy and Sell Stock
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let min = prices[0], 
        max = 0;
    
    for (let i = 1; i < prices.length; i++) {
        const price = prices[i];
        if (price < min) {
            min = price;
        }        
        else {
            max = Math.max(max, price - min);
        }        
    }
    return max;
};


/**
 * 128. Longest Consecutive Sequence
 * 
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if (!nums.length) {
        return 0;
    }
    
    nums.sort((a,b) => a - b)
    nums = [...new Set(nums)];
    let start = 0, end = 1,
        maxLen = 1, len = 1;
    
    while (end < nums.length) {
        const num1 = nums[start],
            num2 = nums[end];
        
        if (num1 + 1 == num2) {
            len++;
            maxLen = Math.max(maxLen, len);
            start++;
            end++;
        }
        else {
            len = 1;
            start = end;
            end++;
        }
    }
    
    return maxLen;
};


/**
 * 152. Maximum Product Subarray
 * 
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    const dpMax = new Array(nums.length),
          dpMin = new Array(nums.length);
    
    let maxProd = dpMax[0] = dpMin[0] = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        dpMax[i] = Math.max(num, dpMax[i-1] * num, dpMin[i-1] * num);
        dpMin[i] = Math.min(num, dpMax[i-1] * num, dpMin[i-1] * num);
        maxProd = Math.max(maxProd, dpMax[i]);
    }
    
    return maxProd;
};


/**
 * 153. Find Minimum in Rotated Sorted Array
 * 
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    return findMinHelper(nums, 0, nums.length-1);
     
    function findMinHelper(nums, start, end) {
        if (start < end) {
            const mid = Math.floor((start + end)/2),
                  midVal = nums[mid];

            if (start <= mid-1 && midVal < nums[mid-1]) {
                return midVal;
            }

            if (mid+1 < end && midVal > nums[mid+1]) {
                return nums[mid+1];
            }

            if (midVal < nums[end]) {
                return findMinHelper(nums, start, mid-1);
            }

            return findMinHelper(nums, mid+1, end);
        }
        
        return nums[start];
    }
};


/**
 * 217. Contains Duplicate
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const set = new Set();
    for (const num of nums) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);
    }
    return false;
};


/**
 * 238. Product of Array Except Self
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const results = [],
          leftProd = [],
          rightProd = [];
    
    leftProd[0] = nums[0];
    rightProd[nums.length-1] = nums[nums.length-1];

    for (let i = nums.length-2; i >= 0; i--) {
        rightProd[i] = nums[i] * rightProd[i+1];
    }

    for (let i = 0; i < nums.length; i++) {
        let val;
        if (i === 0) {
            val = rightProd[1];
        }
        else {
            leftProd[i] = nums[i] * leftProd[i-1];

            if (i === nums.length-1) {
                val = leftProd[nums.length-2];
            }
            else {
                val = leftProd[i-1] * rightProd[i+1];
            }
        }
        results.push(val);
    }

    return results;
};