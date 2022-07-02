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
        if (map.has(diff) && map.get(diff) != i) {
            return [i, map.get(diff)];
        }
    }
    
    return undefined;
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