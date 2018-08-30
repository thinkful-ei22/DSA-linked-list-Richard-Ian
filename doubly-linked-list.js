'use strict';

class _Node {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
  }

  inserFirst(item) {
    let newNode = new _Node(item, this.head, null);
    if(this.head !== null) {
      this.head.previous = newNode;
    }
    this.head = newNode;
  }

  insertLast(item) {
    if(this.head === null) {
      this.inserFirst(item);
    } else {
      let tempNode = this.head;
      while(tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null, tempNode);
    }
  }
  find(item) { 
    //start at the head
    let currNode = this.head;
    //if the list is empty
    if (!this.head){
      return null;
    }
    //Check for the item 
    while(currNode.value !== item) {
      //return null if end of the list 
      // and the item is not on the list
      if (currNode.next === null) {
        return null;
      }
      else {
        //otherwise keep looking 
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }
    
  insertAfter(newItem, oldItem) {
    if (this.find(oldItem) === null) {
      return this.insertLast(newItem);
    }
    let oldNode = this.find(oldItem);
    let nextNode = oldNode.next;
    let newNode = new _Node(newItem, nextNode, oldNode);
    oldNode.next = newNode;
    nextNode ? nextNode.previous = newNode : null;
  }

  insertBefore(newItem, oldItem) {
    if(this.find(oldItem) === null){
      this.insertLast(newItem);
    }
    let oldNode = this.find(oldItem);
    let previousNode = oldNode.previous;
    let newNode = new _Node(newItem, oldNode, previousNode);
    previousNode ? previousNode.next = newNode : null;
    oldNode.previous = newNode;
  }

  insertAt(newItem, position) {
    let curPosition = 1;
    let curNode = this.head;
    while (curPosition <= position) {
      if(curPosition === position){
        // console.log(`hitting conditional newitem:${newItem}, curNode.value${curNode.value}`)
        this.insertBefore(newItem, curNode.value);
      }
      if(curNode === null) {
        //looped through list and didnt find the position
        return null;
      }
      curNode = curNode.next;
      curPosition ++;
    }
  }

  remove(item){ 
    //if the list is empty
    if (!this.head){
      return null;
    }
    //if the node to be removed is head, make the next node head
    if(this.head.value === item){
      this.head = this.head.next;
      this.head.previous = null;
      return;
    }
    let deleteNode = this.find(item);
    let previousNode = deleteNode.previous;
    let nextNode = deleteNode.next;
    previousNode.next = nextNode;
    nextNode.previous = previousNode;
  }

  display(){
    let currNode = this.head;
    let result = [];
    while(currNode) {
      result.push(currNode.value);
      currNode = currNode.next;
    }
    return result;
  }
}

const mainDLL = () => {
  let DLL = new DoubleLinkedList();
  DLL.inserFirst('Aquaria');
  DLL.inserFirst('Caprica');
  DLL.insertLast('Gemenon');
  DLL.insertAfter('Picon', 'Gemenon');
  DLL.insertBefore('Sagittaron', 'Picon');
  DLL.insertAt('Picies', 2);
  DLL.remove('Gemenon');
  reverseDLL(DLL);
  console.log(DLL.find('Sagittaron'));
  console.log(DLL);
};


// console.log(mainDLL());
mainDLL();

function reverseDLL(dlst) {
  let current = dlst.head;
  let previous = dlst.previous;
  let next = dlst.head.next;

  while (current !== null) {
    next = current.next;
    previous = current.previous;
    // console.log(`next ${next ? next.value : 'null'}, current ${current ? current.value: 'null'}, previous ${previous ? previous.value : 'null'}`);
    current.next = previous;
    current.previous = next;
    current = next;
    
  }

  dlst.head = previous.previous;
  return dlst;
}