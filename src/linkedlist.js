/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
 
/**
 * 19. Remove Nth Node From End of List
 * 
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let offset = getLen(head) - n,
        i = 0,
        prev,
        curr = head;
    
    while (curr) {
        if (i == offset) {
            if (prev) {
                prev.next = curr.next;
            }
            else {
                head = curr.next;
            }
            break;
        }
        
        prev = curr;
        curr = curr.next;
        i++;
    }
    return head;
    
    function getLen(curr) {
        let len = 0;
        while (curr) {
            len++;
            curr = curr.next;
        }
        return len;
    }
};


/**
 * 21. Merge Two Sorted Lists
 * 
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let curr1 = list1, 
        curr2 = list2,
        head = null, 
        temp;
    
    while (curr1 && curr2) {
        if (curr1.val < curr2.val) {
            if (!head) {
                head = temp = curr1;
            }
            else {
                temp.next = curr1;
                temp = temp.next;
            }
            curr1 = curr1.next;
        }
        else {
            if (!head) {
                head = temp = curr2;
            }
            else {
                temp.next = curr2;
                temp = temp.next;
            }
            curr2 = curr2.next;
        }
    }
    
    if (curr1) {
        if (!head) {
            head = curr1;
        }
        else {
            temp.next = curr1;
        }
    }
    else if (curr2) {
        if (!head) {
            head = curr2;
        }
        else {
            temp.next = curr2;
        }
    }
    
    return head;
};


/**
 * 23. Merge k Sorted Lists
 * 
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (lists.length > 1) {
        let head,
            node,
            node1 = lists.shift(),
            node2 = lists.shift();

        while (node1 && node2) {
            let val;
            if (node1.val < node2.val) {
                val = node1.val;
                node1 = node1.next;
            }
            else {
                val = node2.val;
                node2 = node2.next;
            }

            if (!node) {
                head = node = new ListNode(val);
            }
            else {
                node.next = new ListNode(val);
                node = node.next;
            }
        }

        if (node1) {
            if (!head) {
                head = node1; 
            }
            else {
                node.next = node1;
            }
        }
        else if (node2) {
            if (!head) {
                head = node2; 
            }
            else {
                node.next = node2;
            }
        }

        if (head) {
            lists.push(head);
        }

        return mergeKLists(lists);
    }

    if (lists.length == 1) {
        return lists.shift();
    }

    return null;
};


/**
 * 141. Linked List Cycle
 * 
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    const set = new Set();
    let temp = head;
    while (temp) {
        if (set.has(temp)) {
            return true;
        }
        set.add(temp);
        temp = temp.next;
    }
    
    return false;
};


/**
 * 143. Reorder List
 * 
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    let curr = head;
    
    while (curr && curr.next) {
        const tail = cutTail(head),
              temp = curr.next;
        
        curr.next = tail;
        tail.next = temp;
        curr = temp;
    }

    return head;
    
    function cutTail(head) {
        let prev, 
            curr = head;
        
        while (curr) {
            if (!curr.next && prev) {
                prev.next = null;
            }
            prev = curr;
            curr = curr.next;
        }
        
        return prev;
    }
};


/**
 * 206. Reverse Linked List
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null, 
        curr = head;
    
    while (curr) {
        const temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
    }
    
    return prev;
};