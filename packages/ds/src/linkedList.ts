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

  print(): void {
    let current = this.head;
    const values: T[] = [];

    while (current) {
      values.push(current.data);
      current = current.next;
    }

    console.log(values.join(" => "));
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



