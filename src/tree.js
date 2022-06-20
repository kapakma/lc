/**
 * 100. Same Tree
 * 
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p && q) {
        if (p.val == q.val) {
            return isSameTree(p.left, q.left) &&
                   isSameTree(p.right, q.right);
        }
    }
    else if (!p && !q) {
        return true; 
    }
    return false;
};


/**
 * 102. Binary Tree Level Order Traversal
 * 
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const results = [];
    if (root) {
        const queue = [root];
        
        while (queue.length) {
            const arr = [];
            for (let i = 0, len = queue.length; i < len; i++) {
                const node = queue.shift();
                arr.push(node.val);

                if (node.left) {
                    queue.push(node.left);
                }

                if (node.right) {
                    queue.push(node.right);
                }
            }

            results.push(arr);
        }
    }
    return results;
};


/**
 * 104. Maximum Depth of Binary Tree
 * 
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root) {
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
    return 0;
};


/**
 * 124. Binary Tree Maximum Path Sum
 * 
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    const global = { max: -Infinity };
    postOrderSum(root, global);
    return global.max;
    
    //post-order traversal
    function postOrderSum(node, global) {
        let leftSum = 0, 
            rightSum = 0;
        
        if (node.left) {
            leftSum = postOrderSum(node.left, global);
        }
        
        if (node.right) {
            rightSum = postOrderSum(node.right, global);
        }
        
        //pick one, parent + max of left, right, or none
        const pickOne = node.val + Math.max(leftSum, rightSum, 0);
        
        //pick all, parent + left & right
        const pickAll = node.val + leftSum + rightSum;
        
        global.max = Math.max(pickAll, pickOne, global.max);
        
        return pickOne;
    }
};


/**
 * 226. Invert Binary Tree
 * 
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root) {
        const temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        invertTree(root.left);
        invertTree(root.right);
    }
    return root;
};


/**
 * 297. Serialize and Deserialize Binary Tree
 * 
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    return serializeLevelOrder(root, ''); 
    
    //bfs to create string
    function serializeLevelOrder(root, s) {
        if (root) {
            const queue = [
                { index: 0, node: root}
            ];
            
            while (queue.length) {
                const {index, node} = queue.shift();
                s += `|${index}:${node.val}`;
                
                if (node.left) {
                    queue.push({
                        index: BigInt(index) * 2n + 1n,
                        node: node.left                        
                    });
                }
                
                if (node.right) {    
                    queue.push({
                        index: BigInt(index) * 2n + 2n,
                        node: node.right,                        
                    });
                }                    
            }
        }
        
        return s;
    }
};

/**
 * 297. Serialize and Deserialize Binary Tree
 * 
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const arr = data.split('|'),
          map = new Map();
    
    //create map from data
    for (const item of arr) {
        const [index, val] = item.split(':');
        map.set(index, val);
    }
    
    let root = null;
    if (data.length) {
        root = new TreeNode(map.get('0'));
        buildBinaryTree(map, 0, root);
    }
    
    return root;
    
    //build binary tree from map
    function buildBinaryTree(map, i, root) {
        const leftIndex =  String(BigInt(i) * 2n + 1n),
              rightIndex = String(BigInt(i) * 2n + 2n);

        if (map.has(leftIndex)) {
            root.left = new TreeNode(map.get(leftIndex));
            buildBinaryTree(map, leftIndex, root.left)
        }

        if (map.has(rightIndex)) {
           root.right = new TreeNode(map.get(rightIndex));          
           buildBinaryTree(map, rightIndex, root.right)
        }
    }
};