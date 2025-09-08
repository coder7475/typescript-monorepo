# 1. Class and Static Methods

class MathOperations():
    @classmethod
    def class_info(cls):
        return f"This is {cls.__name__}"
    
    @staticmethod
    def add(a, b):
        return a + b
    
# Directly access methods without object instantiation
print(MathOperations.class_info())  # Output: This is MathOperations
print(MathOperations.add(5, 3))     # Output: 8

# 2. Property Decorators
class Employee:
    def __init__(self, name, salary):
        self._name = name
        self._salary = salary # use protected attribute with _ although python doesn't enforce it

    @property
    def salary(self):
        """Getter for the salary attribute."""
        return self._salary
    
    @salary.setter
    def salary(self, value):
        """Setter for the salary attribute with validation."""
        if not isinstance(value, (int, float)):
            raise TypeError("Salary must be a number")
        if value < 0:
            raise ValueError("Salary cannot be negative")
        self._salary = value

    @salary.deleter
    def salary(self):
        """Deleter for the salary attribute."""
        print(f"Deleting salary for {self._name}")
        self._salary = None



# Usage example
try:
    # Create an Employee instance
    emp = Employee("Bob", 50000)
    
    # Access salary using the getter
    print(f"Initial salary: {emp.salary}")  # Output: Initial salary: 50000
    
    # Modify salary using the setter
    emp.salary = 60000
    print(f"Updated salary: {emp.salary}")  # Output: Updated salary: 60000
    
    # Attempt to set an invalid salary
    # emp.salary = -1000  # Raises ValueError: Salary cannot be negative
    # emp.salary = "invalid"  # Raises TypeError: Salary must be a number
    
    # Delete the salary attribute
    del emp.salary
    print(f"Salary after deletion: {emp.salary}")  # Output: Salary after deletion: None

except (ValueError, TypeError) as e:
    print(f"Error: {e}")