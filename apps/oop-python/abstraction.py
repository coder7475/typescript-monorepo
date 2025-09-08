from abc import ABC, abstractmethod

# Abstract Class
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        # super().__init__(self)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height
    


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

# Creating objects
rect = Rectangle(4, 5)
circle = Circle(3)
print(rect.area())   # Output: 20
print(circle.area())  # Output: 28.274333882308138
# shape = Shape()     # Error: Can't instantiate abstract class
    