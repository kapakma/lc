/**
 * 20. Valid Parentheses
 * 
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [],
        openRE =  /[\(\[\{]/,
        closeRE = /[\)\]\}]/;
    
    for (const ch of s) {
        if (openRE.test(ch)) {
            stack.push(ch);
        }
        else if (closeRE.test(ch)) {
            const openBr = stack.pop();
            if ((openBr != '(' && ch == ')') ||
                (openBr != '{' && ch == '}') ||
                (openBr != '[' && ch == ']')) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    
    return stack.length == 0;
};


/**
 * 125. Valid Palindrome
 * 
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0,
        right = s.length - 1;
    
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
};


/**
 * 242. Valid Anagram
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length != t.length) {
        return false;
    }
    
    s = s.split('').sort().join('');
    t = t.split('').sort().join('');
    return s == t;
};