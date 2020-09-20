/*
The given string has pipe delimited nodes that represent family members in a family tree. Each node is a CSV with the values being "parent_id, node_id, node_name".  Write a method that takes the string and return a single result that represents the data as a hierarchy (root, children, siblings, etc).
"null,0,grandpa|0,1,son|0,2,daugther|1,3,grandkid|1,4,grandkid|2,5,grandkid|5,6,greatgrandkid"

-          Solve it in any language that you prefer
-          Display the result any way that you please
"null,0,grandpa|0,1,son|0,2,daugther|1,3,grandkid|1,4,grandkid|2,5,grandkid|5,6,greatgrandkid"

null,0,grandpa
0,1,son
0,2,daugther
1,3,grandkid
1,4,grandkid
2,5,grandkid
5,6,greatgrandkid
*/

var str = "null,0,grandpa|0,1,son|0,2,daugther|1,3,grandkid|1,4,grandkid|2,5,grandkid|5,6,greatgrandkid";
var rows = str.split('|');
var rowsArr = [];

rows.forEach(function(row) {
    items = row.split(',');
    rowsArr.push(items);
});

console.log('rowsArr');
console.log(rowsArr);

// creating node constructor
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
    }

// creating tree constructor
function Tree(data) {
    var node = new Node(data);
    this.root = node;
}

// creating n-ary tree
var tree = new Tree(rowsArr[0][2]); // grandpa
 
tree.root.children[rowsArr[1][1]] = new Node(rowsArr[1][2]); // son
tree.root.children[rowsArr[1][1]].parent = tree;
 
tree.root.children[rowsArr[2][1]] = new Node(rowsArr[2][2]); // daughter
tree.root.children[rowsArr[2][1]].parent = tree;
 
tree.root.children[1].children[rowsArr[3][1]] = new Node(rowsArr[3][2]); // grandkid
tree.root.children[1].children[rowsArr[3][1]].parent = tree.root.children[1];
 
tree.root.children[1].children[rowsArr[4][1]] = new Node(rowsArr[4][2]);  // grandkid
tree.root.children[1].children[rowsArr[4][1]].parent = tree.root.children[1];
 
tree.root.children[2].children[rowsArr[5][1]] = new Node(rowsArr[4][2]); // grandkid
tree.root.children[2].children[rowsArr[5][1]].parent = tree.root.children[2];
 
tree.root.children[2].children[5].children[rowsArr[6][1]] = new Node(rowsArr[6][2]); // greatgrandkid
tree.root.children[2].children[5].children[rowsArr[6][1]].parent = tree.root.children[2].children[5].children[6];

function Queue() {
    this.oldestIndex = 1;
    this.newestIndex = 1;
    this.storage = {};
}

Queue.prototype.enqueue = function(data) {
    this.storage[this.newestIndex] = data;
    this.newestIndex++;
}

Queue.prototype.dequeue = function() {
    var deletedData;
    if(this.oldestIndex != this.newestIndex) {
        deletedData = this.storage[this.oldestIndex];
        delete this.storage[this.oldestIndex];
        this.oldestIndex++;
        return deletedData;
    }
}

Queue.prototype.printQ = function() {
    var size = this.size();
    for(var i = this.oldestIndex; i < this.newestIndex; i++) {
        console.log(this.storage[i]);
    }
    return size;
}

Queue.prototype.size = function() {
    return this.newestIndex - this.oldestIndex;
}

Tree.prototype.traverseBF = function(){
    var currentNode = this.root;
    var queue = new Queue();
    while(currentNode){
        console.log(currentNode.data);
        currentNode.children.forEach(children => queue.enqueue(children) );
        currentNode = queue.dequeue();
    }
}

tree.traverseBF();
/*
 returns
 grandpa
 son
 daughter
 grandkid
 grandkid
 grandkid
 greatgrandkid
 */
