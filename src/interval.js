/**
 * 56. Merge Intervals
 * 
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    
    let curr = intervals[0];
    const results = [curr];
    for (let i = 1; i < intervals.length; i++) {
        const intv = intervals[i];
        if (intv[0] <= curr[1]) {
            curr = [curr[0], Math.max(curr[1], intv[1])];
            results[results.length-1] = curr;
        }
        else {
            curr = intv;
            results.push(curr);
        }    
    }
    return results;
};


/**
 * 252. Meeting Rooms
 * 
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let curr = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const intv = intervals[i];
        if (intv[0] < curr[1]) {
            return false;
        }
        curr = intv;
    }

    return true;
}


/**
 * 435. Non-overlapping Intervals
 * 
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b) => a[0] - b[0]);

    let count = 0,
        curr = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const intv = intervals[i];
        if (intv[0] < curr[1]) {
            count++;
            if (intv[1] < curr[1]) {
                curr = intv;
            }
        }
        else {
            curr = intv;
        }
    }    
    
    return count;
};