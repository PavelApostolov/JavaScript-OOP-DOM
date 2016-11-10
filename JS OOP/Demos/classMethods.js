class listNode {
    constructor(value) {
        this.data = value;
        this.next = null;
    }

    get next() {
        return this._next;
    }

    set next(value) {
        this._next = value;
    }

    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
}

class LinkedList {
    constructor() {
        this._length = 0;
        this._firstItem = null;
    }

    get first() {
        let firstElement = this.at(0);
        return firstElement;
    }

    get last() {
        let lastElement = this.at(this.length - 1);
        return lastElement;
    }

    get length() {
        this._length = this._getLength();
        return this._length;
    }

    append(...values) {
        let currentItem;

        for (let name of values) {

            let itemToAppend = new listNode(name);

            if (this._firstItem) {
                currentItem = this._firstItem;

                while (currentItem.next) {
                    currentItem = currentItem.next;
                }

                currentItem.next = itemToAppend;

            } else {
                this._firstItem = itemToAppend;
            }

        }
        return this;
    }

    prepend(...values) {
        var initialFirstItem = this._firstItem,
            currentItem,
            len = values.length;

        for (let i = 0; i < len; i += 1) {
            let itemToAppend = new listNode(values[i]);

            if (i === 0) {
                this._firstItem = itemToAppend;
                currentItem = itemToAppend;
            }
            else {
                currentItem.next = itemToAppend;
                currentItem = currentItem.next;
            }

        }
        currentItem.next = initialFirstItem;
        return this;
    }

    insert(index, ...values) {
        let hasElementsInList = this.length > 0 && index !== 0;

        if (hasElementsInList) {

            let prevIndexElement = this._getElementAt(index - 1),
                nextIndexElement = this._getElementAt(index),
                len = values.length;

            for (var i = 0; i < len; i += 1) {
                let elementToAppend = new listNode(values[i]);

                prevIndexElement.next = elementToAppend;
                prevIndexElement = prevIndexElement.next;
            }
            prevIndexElement.next = nextIndexElement;
        } else {
            this.prepend(...values);
        }
        return this;
    }

    at(index, value) {
        let indexItem = this._getElementAt(index);

        // Zero is false-like
        if (value || value === 0) {
            indexItem.data = value;
            return this;
        } else {
            return indexItem.data;
        }
    }

    _getElementAt(index) {

        let count = 0,
            currentElement = this._firstItem;

        while (currentElement && count < index) {
            currentElement = currentElement.next;
            count += 1;
        }

        return currentElement;
    }

    _getLength() {
        let counter = 1,
            currentItem;

        if (this._firstItem) {
            currentItem = this._firstItem;
        } else {
            return 0;
        }

        while (currentItem.next) {
            currentItem = currentItem.next;
            counter += 1;
        }

        return counter;
    }

    removeAt(index) {

        if (this.length === 0) {
            return;
        }

        let prevIndexElement = this._getElementAt(index - 1),
            indexElement = this._getElementAt(index) || undefined;

        if (index === 0) {
            this._firstItem = indexElement.next;

        } else {
            prevIndexElement.next = indexElement.next;
        }

        return indexElement.data;
    }

    toArray() {
        let array = [],
            currentItem = this._firstItem;

        for (var i = 0; i < this.length; i += 1) {
            array.push(currentItem.data);

            currentItem = currentItem.next;
        }

        return array;
    }

    toString() {
        let arr = this.toArray(),
            result = arr.join(' -> ');

        return result;
    }

    *[Symbol.iterator]() {
        var currentElement = this._firstItem;

        while (currentElement) {
            yield currentElement.data;
            currentElement = currentElement.next;
        }
    }

}

module.exports = LinkedList;

////////////////

'use strict';

class listNode {
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    get first() {
        return this._head.data;
    }

    get last() {
        return this._tail.data;
    }

    get length() {
        return this._length;
    }

    _find(index) {
        if (index < 0 || index > this._length - 1) {
            return null;
        }

        var element = this._head;

        for (let i = 0; i < index; i += 1) {
            element = element.next;
        }

        return element;
    }

    append(...nodes) {
        nodes.forEach(n => this.insert(this._length, n));
        return this;
    }

    prepend(...nodes) {
        for (let i = nodes.length - 1; i >= 0; i -= 1) {
            this.insert(0, nodes[i]);
        }

        return this;
    }

    insert(...args) {
        let length = args.length;
        let index = args[0];

        let nextElement = this._find(index);
        let previousElement = this._find(index - 1);

        let current = new listNode(args[1]);

        if (index === 0) {
            this._head = current;
        }
        else {
            previousElement.next = current;
        }

        let nextCurrentElement = current;

        for (let i = 2; i < length; i += 1) {
            nextCurrentElement = new listNode(args[i]);
            current.next = nextCurrentElement;
            current = nextCurrentElement;
        }

        if (nextElement) {
            nextCurrentElement.next = nextElement;
        }
        else {
            this._tail = nextCurrentElement;
        }

        this._length += length - 1;
        return this;
    }

    at(...args) {
        if (args.length === 2) {
            this._find(args[0]).data = args[1];
        }
        else {
            return this._find(args[0]).data;
        }
    }

    removeAt(index) {
        let current = this._find(index);
        let previous = this._find(index - 1);
        let next = this._find(index + 1);

        if (next) {
            if (previous) {
                previous.next = next;
            }
            else {
                this._head = next;
            }
        }
        else {
            this._tail = previous;
        }

        this._length -= 1;
        return current.data;
    }

    toArray() {
        let array = [];

        for (let el of this) {
            array.push(el);
        }

        return array;
    }

    toString() {
        return this.toArray().join(' -> ');
    }
}

LinkedList.prototype[Symbol.iterator] = function () {

    // get head
    var current = this._head;
    let count = 0;

    // set to true when the loop is done 
    let isDone = false;

    // define the next method, need for iterator 
    let next = () => {

        if (count !== 0) {
            current = current.next;
        } else {
            count++;
        }

        // control on last property reach 
        if (current === null) {
            isDone = true;
            current = [];
            current.data = null;
        }

        return { done: isDone, value: current.data };
    };

    // return the next method used to iterate 
    return { next };
};

module.exports = LinkedList;


/////////////////////////////////////////

'use strict';

class listNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
    }

    append(...elements) {
        var listLen = this.length,
            node = new listNode(elements[0]),
            prevNode;

        if (listLen) {
            this.lastNode.next = node;
        } else {
            this.head = node;
        }

        this._length += 1;
        prevNode = node;
        
        for(let i = 1, len = elements.length; i < len; i += 1) {
            node = new listNode(elements[i]);
            prevNode.next = node;
            prevNode = node;
            this._length += 1;
        }

        return this;
    }

    prepend(...elements) {
        var listLen = this.length,
            node = new listNode(elements[0]),
            headNode,
            prevNode;
        
        if (listLen) {
            headNode = this.head;
        }

        this.head = node;
        prevNode = node;
        this._length += 1;

        for(let i = 1, len = elements.length; i < len; i += 1) {
            node = new listNode(elements[i]);
            prevNode.next = node;
            prevNode = node;
            this._length += 1;
        }

        prevNode.next = headNode;

        return this;
    }

    insert(...args) {
        var index =  args.shift(0),
            node = this.head,
            counter = 0,
            prevNode,
            nextNode;
        
        if (index === 0) {
            return this.prepend(...args);
        }

        while (node !== null) {
            if (counter === index - 1) {
                prevNode = node;
                nextNode = node.next;
                break;
            }

            node = node.next;
            counter += 1;
        }

        for(let i = 0, len = args.length; i < len; i += 1) {
            node = new listNode(args[i]);
            prevNode.next = node;
            prevNode = node;
            this._length += 1;
        }

        prevNode.next = nextNode;

        return this;
    }

    removeAt(index) {
        var node = this.head,
            nextNode = node.next,
            counter = 0,
            prevNode;

        while (node !== null) {
            if (counter === index) {
                if (prevNode) {
                   prevNode.next = nextNode;
                } else {
                    this.head = nextNode;
                }

                this._length -= 1;
                break;
            }

            prevNode = node;
            node = node.next;
            nextNode = node.next;
            counter += 1;
        }

        return node.value;
    }

    at(index, value) {
        var node = this.head,
            counter = 0;

        while (node !== null) {
            if (counter === index) {
                if (typeof value === 'undefined') {
                    return node.value;
                } else {
                    node.value = value;
                    return this;
                }
            }

            node = node.next;
            counter += 1;
        }

        
    }

    toArray() {
        var arr = [],
            node = this.head;
        
        while (node !== null) {
            arr.push(node.value);
            node = node.next;
        }
        
        return arr;
    }

    [Symbol.iterator]() {
        var node = this.head;

        return {
            next: () => ({ value: node.value, done: !(node.next === null),
            node: node.next })
        };
    }

    get first() {
        return this.head.value;
    }

    get last() {
        var node = this.head,
            lastValue;
            
        while (node !== null) {
            lastValue = node.value;
            node = node.next;
        }

        return lastValue;
    }

    get lastNode() {
        var node = this.head,
            lastNode;
            
        while (node !== null) {
            lastNode = node;
            node = node.next;
        }

        return lastNode;
    }

    get length() {
        return this._length;
    }

    toString() {
        var result = '',
            counter = 0,
            len = this.length,
            node = this.head;
        
        while (node !== null) {
            result += node.value;
            counter++;
            if (counter < len) {
                result += ' -> ';
            }

            node = node.next;
        }

        return result;
    }
}

module.exports = LinkedList;

/////////////////////////////

'use strict';
var listNode = (function () {

    class listNode {
        constructor(value) {
            this.data = value;
            this.nextNode = null;
        }

        get data() {
            return this._data;
        }

        set data(val) {
            this._data = val;
        }

        get nextNode() {
            return this._next;
        }

        set nextNode(val) {
            this._next = val;
        }
    }

    return listNode;
} ());

var LinkedList = (function (listNode) {

    function getNodeAtIndex(ind) {
        let currNode;

        if (ind < 0 || this._length - 1 < ind) {
            currNode = null;
        }
        else {
            let i = 0;

            currNode = this._head;

            while (i < ind) {
                currNode = currNode.nextNode;
                i += 1;
            }
        }

        return currNode;
    }

    class LinkedList {
        constructor() {
            this._length = 0;
            this._head = null;
        }

        get first() {
            if (this._head !== null) {
                return this._head.data;
            }
            else {
                return null;
            }
        }

        get last() {
            let lastInd = this._length - 1;
            if (this._head !== null) {
                return getNodeAtIndex.call(this, lastInd).data;
            }
            else {
                return null;
            }
        }

        get length() {
            return this._length;
        }

        append(...args) {
            let itemsToAdd = args;
            itemsToAdd = itemsToAdd.map(el => {
                return new listNode(el);
            });

            let last;
            let lastInd = this._length - 1;
            if (this._head === null) {
                this._head = itemsToAdd[0];
                last = this._head;
            }
            else {
                last = getNodeAtIndex.call(this, lastInd);
                last.nextNode = itemsToAdd[0];
                last = last.nextNode;
            }

            this._length += 1;

            for (let i = 1, len = itemsToAdd.length; i < len; i += 1) {
                let currentItem = itemsToAdd[i];
                last.nextNode = currentItem;
                last = last.nextNode;
                this._length += 1;
            }

            return this;
        }

        prepend(...args) {
            let itemsToAdd = args.map(node => { return new listNode(node); });

            let next = this._head;
            this._head = itemsToAdd[0];
            this._length += 1;

            let curr = this._head;
            for (let i = 1, len = itemsToAdd.length; i < len; i += 1) {
                curr.nextNode = itemsToAdd[i];
                curr = curr.nextNode;
                this._length += 1;
            }

            curr.nextNode = next;
            return this;
        }

        insert(ind, ...args) {
            if (ind === 0) {
                this.prepend(...args);
            }
            else {
                let itemsToAdd = args.map(el => { return new listNode(el); });

                let prev = getNodeAtIndex.call(this, ind - 1);
                let next = prev.nextNode;

                prev.nextNode = itemsToAdd[0];
                this._length += 1;

                let curr = prev.nextNode;
                for (let i = 1, len = itemsToAdd.length; i < len; i += 1) {
                    curr.nextNode = itemsToAdd[i];
                    curr = curr.nextNode;
                    this._length += 1;
                }

                curr.nextNode = next;
            }

            return this;
        }

        at(ind, param) {
            if (param === undefined) {
                return getNodeAtIndex.call(this, ind).data;
            }
            else {
                if (ind === 0) {
                    this._head.data = param;
                }
                else {
                    getNodeAtIndex.call(this, ind).data = param;
                }

                return this;
            }
        }

        removeAt(ind) {
            let prev, removed;
            if (ind === 0) {
                removed = this._head.data;
                this._head = this._head.nextNode;
            }
            else if (ind === this._length - 1) {
                prev = getNodeAtIndex.call(this, ind - 1);
                removed = prev.nextNode.data;
                prev.nextNode = null;
            }
            else {
                prev = getNodeAtIndex.call(this, ind - 1);
                let curr = prev.nextNode;
                removed = curr.data;
                prev.nextNode = curr.nextNode;
            }

            this._length -= 1;
            return removed;
        }

        toString() {
            let curr = this._head;
            let str = '';

            while (curr.nextNode !== null) {
                str += curr.data + ' -> ';
                curr = curr.nextNode;
            }

            str += curr.data;

            return str;
        }

        toArray() {
            let arr = [];
            for (let node of this) {
                arr.push(node);
            }

            return arr;
        }

        [Symbol.iterator]() {
            let curr = this._head;
            return {
                next: function () {
                    if (curr === null) {
                        return { done: true };
                    }
                    else {
                        let data = curr.data;
                        curr = curr.nextNode;
                        return {
                            value: data,
                            done: false
                        };
                    }
                }
            };
        }
    }

    return LinkedList;
})(listNode);

module.exports = LinkedList;