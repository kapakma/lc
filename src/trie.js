/** 
 * 208. Implement Trie (Prefix Tree)
 * 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
var TrieNode = function() {
    this.children = {};
    this.endOfWord = false;
}

var Trie = function() {
    this.root = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.root;
    for (const ch of word) {
        if (!node.children[ch]) {
            node.children[ch] = new TrieNode();
        }
        node = node.children[ch];
    }
    
    node.endOfWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.root;
    for (const ch of word) {
        if (!node.children[ch]) {
            return false;
        }
        node = node.children[ch];
    }
    
    return node.endOfWord;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.root;
    for (const ch of prefix) {
        if (!node.children[ch]) {
            return false;
        }
        node = node.children[ch];
    }
    
    return true;
};


/**
 * 211. Design Add and Search Words Data Structure
 *  
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
var WordDictionary = function() {
    this.root = new TrieNode();
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let node = this.root;
    for (const ch of word) {
        if (!node.children[ch]) {
            node.children[ch] = new TrieNode();
        }
        node = node.children[ch];
    }
    node.endOfWord = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    return searchHelper(this.root, word, 0);
    
    function searchHelper(node, word, i) {
        if (i < word.length) {
            const ch = word.charAt(i);
            if (ch === '.') {
                for (const key in node.children) {
                    if (searchHelper(node.children[key], word, i+1)) {
                        return true;
                    }
                }
                return false;
            }
            
            if (!node.children[ch]) {
                return false;
            }
            
            return searchHelper(node.children[ch], word, i+1);
        }
        
        return node.endOfWord;
    }
};