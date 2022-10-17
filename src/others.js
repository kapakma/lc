/**
 * 365. Water and Jug Problem
 * 
 * @param {number} jug1Capacity
 * @param {number} jug2Capacity
 * @param {number} targetCapacity
 * @return {boolean}
 */
var canMeasureWater = function(jug1Capacity, jug2Capacity, targetCapacity) {
    const memo = new Set();
    let jug1 = 0,
        jug2 = 0;
    
    while (jug1 != targetCapacity && jug2 != targetCapacity) {
        if (jug1 == 0) {
            jug1 = jug1Capacity;
        }
        
        if (jug2 < jug2Capacity) {
            const amt = Math.min(jug1, jug2Capacity - jug2);
            jug1 -= amt;
            jug2 += amt;
        }
        else {
            if (jug1 + jug2 == targetCapacity) {
                return true;
            }
            jug2 = 0;
        }
        
        const key = `${jug1}-${jug2}`;
        if (memo.has(key)) {
            return false;
        }
        
        memo.add(key);
    }
    
    return true;
};