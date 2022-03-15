from cart import db
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from flask import jsonify


@dataclass
class Customer(db.Model):
    id: int
    name: str 

    id = db.Column(db.Integer, primary_key = True )
    name = db.Column(db.String(50), nullable = False)
    cart = relationship("Cart", back_populates='customer')

@dataclass
class Product(db.Model):
    id: int
    name: str
    price: float 
    tag: str 
    pic_ref: str 

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(10), nullable = False)
    price = db.Column(db.Float, nullable = False)
    tag = db.Column(db.String(500), nullable = False)
    pic_ref = db.Column(db.String(500), nullable = False)
    cart_item = relationship("CartItem", back_populates='product')

@dataclass
class Cart(db.Model):
    id: int
    customer: Customer
    
    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    customer = db.relationship(Customer)
    cart_item = relationship("CartItem", back_populates='cart')

@dataclass
class CartItem(db.Model):
    id: int
    product: Product
    cart: Cart
    quantity: int

    __tablename__ = "cart_item"

    id = db.Column(db.Integer, primary_key = True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    product = db.relationship(Product)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'))
    cart = db.relationship(Cart)
    quantity = db.Column(db.Integer)
