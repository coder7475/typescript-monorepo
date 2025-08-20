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
