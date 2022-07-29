/**
 * 567. Permutation in String
 * 
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) {
        return false;
    }
    
    const map = {};
    for (const ch of s1) {
        if (map[ch]) {
            map[ch]++;
        }
        else {
            map[ch] = 1;
        }
    }
    
    let start = 0,
        end = s1.length;
    while (end <= s2.length) {
        let m = Object.assign({}, map);
        let i;
        for (i = end-1; i >= start; i--) {
            const ch = s2.charAt(i);
            if (!m[ch]) {
                break;
            }
            m[ch]--;
        }
        
        if (Object.values(m).every(item => item == 0)) {
            return true;
        }
        
        start = i + 1;
        end = start + s1.length;
        
    }
    
    return false;
};


/**
 * 904. Fruit Into Baskets
 * 
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    const NUM_BASKETS = 2;
    let begin = 0, 
        last = 0,
        maxCollected = 0;
    const baskets = new Set();

    while (last < fruits.length) {
        const fruit = fruits[last];
        if (!baskets.has(fruit)) {
            if (baskets.size < NUM_BASKETS) {
                baskets.add(fruit);
            }
            else {
                begin = last - 1;
                const val = fruits[begin--];
                //rewind
                while(fruits[begin] == val) {
                    begin--;
                }
                
                baskets.delete(fruits[begin]);
                baskets.add(fruit);
                begin++;
            }
        }
        const collected = last - begin + 1;
        last++;
        
        maxCollected = Math.max(maxCollected, collected);
    }
    
    return maxCollected;
};