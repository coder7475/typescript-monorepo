// Object-Oriented Programming (OOP) is a programming paradigm that organizes software around "objects."
// read more: https://dev.to/coder7475/understanding-object-oriented-programming-in-typescript-17d1
/**
 * ? Four Pillars of OOP
 * 1. Encapsulation
 * 2. Abstraction
 * 3. Inheritance
 * 4. Polymorphism
 */

// ! Encapsulation
// Bundles data and methods into a class while restricting direct access to internal details.
// use class
class BankAccount {
  private balance: number = 0;

  public deposit(amount: number) {
    if (amount > 0) {
      this.balance = amount;
    }
  }

  public withdraw(amount: number) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    }
  }

  public getBalance(): number {
    return this.balance;
  }
}
// example usage
// const myAccount = new BankAccount();

// myAccount.deposit(43000);

// console.log("Current Balance: ", myAccount.getBalance());

// myAccount.withdraw(25000);

// console.log("Current Balance: ", myAccount.getBalance());

// ! Abstraction
// Abstract conceals intricate details, exposing only essential functionalities.
// ? Emphasizes "what" ove "how"
// uses abstract classes or interface
// ! Abstract Class
/* 
?  Abstraction using abstract class

*

abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangular extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}
*/
// ! Interface
interface Shape {
  calculateArea(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangular implements Shape {
  constructor(
    private width: number,
    private height: number,
  ) {}

  calculateArea(): number {
    return this.width * this.height;
  }
}

// Example usage
// const shapes: Shape[] = [new Circle(6), new Rectangular(4, 6)];

// shapes.forEach((shape) => {
//   console.log(shape.calculateArea());
// });

/**
 * ? Inheritance
 * Enable child class to acquire properties and methods from parent class
 */
class Animal {
  constructor(protected name: string) {}

  move(): void {
    console.log(`${this.name} is moving.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  bark(): void {
    console.log(`${this.name} says Woof!`);
  }
}

// example usage
const dog = new Dog("Buddy");
dog.move(); // Buddy is moving.
dog.bark(); // Buddy says Woof!

/**
 * ? Polymorphism
 * Allows methods to do different things based on the object it is acting upon.
 * Achieved through method overriding or overloading.
 */
// Example of method overriding
class MessageFormatter {
  // Overload signatures
  format(message: string): string;
  format(message: string, userId: number): string;
  format(message: string, userId: number, timestamp: Date): string;

  // Single implementation

  format(message: string, userId?: number, timestamp?: Date): string {
    let formatted = message;

    if (userId !== undefined) {
      formatted = `[User ${userId}] ${formatted}`;
    }
    if (timestamp !== undefined) {
      formatted = `${formatted} (at ${timestamp.toISOString()})`;
    }

    return formatted;
  }
}

const formatter = new MessageFormatter();

console.log(formatter.format("System started"));
// Output: System started

console.log(formatter.format("User logged in", 42));
// Output: [User 42] User logged in

console.log(formatter.format("File uploaded", 42, new Date()));
// Output: [User 42] File uploaded (at 2025-08-20T13:10:15.000Z)

// Example of method overriding in inheritance
abstract class Payment {
  abstract process(amount: number): void;
}

class CreditCardPayment extends Payment {
  process(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
  }
}

class PayPalPayment extends Payment {
  process(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

class CryptoPayment extends Payment {
  process(amount: number): void {
    console.log(`Processing cryptocurrency payment of $${amount}`);
  }
}

const payments: Payment[] = [
  new CreditCardPayment(),
  new PayPalPayment(),
  new CryptoPayment(),
];

payments.forEach((payment) => payment.process(100));

// Output:
// Processing credit card payment of $100
// Processing PayPal payment of $100
// Processing cryptocurrency payment of $100
