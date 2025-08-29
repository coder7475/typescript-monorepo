class Node<T> {
  next: Node<T> | null;
  constructor(public data: T) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // add node to the end of the list
  append(data: T): void {
    const newNode = new Node<T>(data);
    this.size++;

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Add node to beginning of list
  prepend(data: T): void {
    const newNode = new Node(data);
    this.size++;

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert at specific position
  insertAt(data: T, position: number): boolean {
    if (position < 0 || position > this.size) {
      return false;
    }

    if (position === 0) {
      this.prepend(data);
      return true;
    }

    if (position === this.size) {
      this.append(data);
      return true;
    }

    const newNode = new Node(data);
    let current = this.head;
    let previous = null;
    let index = 0;

    while (index < position && current) {
      previous = current;
      current = current.next;
      index++;
    }

    newNode.next = current;
    if (previous) previous.next = newNode;
    this.size++;

    return true;
  }

  // Remove first occurrence of data
  remove(data: T) {
    if (!this.head) {
      return false;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      if (this.size === 0) {
        this.tail = null;
      }
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        if (!current.next) {
          this.tail = current;
        }
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Remove node at specific position
  removeAt(position: number) {
    if (position < 0 || position >= this.size) {
      return null;
    }

    let removedNode;
    if (position === 0) {
      removedNode = this.head;
      if (this.head) {
        this.head = this.head.next;
      }
      if (this.size === 1) {
        this.tail = null;
      }
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;

      while (index < position) {
        previous = current;

        if (current) current = current.next;

        index++;
      }

      removedNode = current;
      if (previous && current) previous.next = current.next;
      if (current && !current.next) {
        this.tail = previous;
      }
    }

    this.size--;

    let result;
    if (removedNode) result = removedNode.data;

    return result;
  }

  // console log the values
  print(): void {
    let current = this.head;
    const values: T[] = [];

    while (current) {
      values.push(current.data);
      current = current.next;
    }

    console.log(values.join(" => "));
  }

  // Get data at specific position
  get(position: number) {
    if (position < 0 || position >= this.size) {
      return null;
    }

    let current = this.head;
    let index = 0;

    while (index < position) {
      if (current) current = current.next;
      index++;
    }
    const result = current ? current.data : null;

    return result;
  }

  // create a array from list
  toArray(): T[] {
    let current = this.head;
    const values: T[] = [];

    while (current) {
      values.push(current.data);
      current = current.next;
    }

    return values;
  }

  // check if list contains the element
  find(element: T): boolean {
    let current = this.head;
    while (current) {
      if (current.data === element) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // * ? utilities
  // Check if list is empty
  isEmpty(): boolean {
    return this.size == 0;
  }

  // Get size of the list
  length(): number {
    return this.size;
  }

  // clear the list
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

const numberList = new LinkedList<number>();
numberList.append(10);
numberList.append(20);
numberList.print();
//
// let current = numberList.head;
//
// while (current) {
//   console.log(current.data);
//   current = current.next;
// }
//
const stringList = new LinkedList<string>();
stringList.append("Hello");
stringList.append("World");

stringList.print();
