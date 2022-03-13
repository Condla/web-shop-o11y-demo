from cart import db
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from flask import jsonify

@dataclass
class Customer(db.Model):
    id: int
    name: str 
    __tablename__ = "customer"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50), nullable = False)
    cart = relationship("Cart", back_populates='customer', uselist=False)

@dataclass
class Product(db.Model):
    id: int
    name: str
    price: str 
    tag: str 
    pic_ref: str 

    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(10), nullable = False)
    price = db.Column(db.String(10), nullable = False)
    tag = db.Column(db.String(500), nullable = False)
    pic_ref = db.Column(db.String(500), nullable = False)
    cart_item = relationship("CartItem", back_populates='product', uselist=False)


@dataclass
class CartItem(db.Model):
    id: int
    product_id: int
    cart_id: int
    quantity: int

    __tablename__ = "cart_item"

    id = db.Column(db.Integer, primary_key = True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'))
    quantity = db.Column(db.Integer)
    product = relationship("Product", back_populates="cart_item")
    cart = relationship("Cart", back_populates="cart_items")


@dataclass
class Cart(db.Model):
    id: int
    customer_id: int
    
    __tablename__ = "cart"

    id = db.Column(db.Integer, primary_key = True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))
    customer = relationship("Customer", back_populates="cart")
    cart_items = relationship("CartItem", back_populates="cart")
