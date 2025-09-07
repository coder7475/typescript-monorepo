# Core Concepts of OOP
# 1. Classes and Objects

## Define a Class called Car
class Car:
    # constructor 
    def __init__(self, brand, model):
        self.brand = brand # instance attribute/data
        self.model = model
    # method/functions
    def display_info(self): 
        return f"{self.brand} {self.model}"


## Creating objects with Car class
car1 = Car("Toyota", "Camry")
car2 = Car("Honda", "Civic")

## Accessing attributes and methods
# print(car1.display_info())
# print(car2.display_info())

## Encapsulation 
### Controlled data access using access modifier
class BankAccount:
    def __init__(self, account_holder, balance):
        self.account_holder = account_holder
        self.__balance = balance # Private attribute

    def deposits(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"Deposited {amount}. New Balance: {self.__balance}"
        return "Invalid deposited amount"

    # Getter - Public Method to get private value
    def get_balance(self):
        return self.__balance
    
### Creating objects
account = BankAccount("Fahad", 40000);

# print(account.deposits(2000))
# print(account.get_balance())
# print(account.__balance)  # Error: AttributeError (private attribute)


