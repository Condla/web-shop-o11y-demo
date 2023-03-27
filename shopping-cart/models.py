from cart import db
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import func, ForeignKey, String
from dataclasses import dataclass
from flask import jsonify
from datetime import datetime
from typing import Optional, List

@dataclass
class Customer(db.Model):
    __tablename__ = "customer"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable = False)
    created_date: Mapped[datetime] = mapped_column(server_default=func.now())
   
   #carts: Mapped[List["Cart"]] = relationship(back_populates='customer')
    carts = relationship("Cart", back_populates='customer')


@dataclass
class Cart(db.Model):
    __tablename__ = "cart"
    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey('customer.id'))
    is_deleted: Mapped[bool] = mapped_column(nullable=False, default=False)
    created_date: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_date: Mapped[datetime] = mapped_column(onupdate=func.now(), nullable=True)

    #customer: Mapped["Customer"] = relationship(back_populates="carts")
    #cart_items: Mapped[List["CartItem"]] = relationship(back_populates='cart')
    #order: Mapped[Optional["Order"]] = relationship(back_populates="cart")
    
    customer = relationship("Customer", back_populates="carts")
    cart_items = relationship("CartItem", back_populates='cart')
    order = relationship("Order", back_populates="cart")

@dataclass
class Product(db.Model):
    __tablename__ = "product"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable = False)
    price: Mapped[float] = mapped_column(nullable = False)
    tag: Mapped[str] = mapped_column(String(5000), nullable = False)
    pic_ref: Mapped[str] = mapped_column(String(5000), nullable = False)
    
    #cart_items: Mapped[List["CartItem"]] = relationship(back_populates='product')
    cart_items = relationship("CartItem", back_populates='product')

@dataclass
class Order(db.Model):
    __tablename__ = "order_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    cart_id: Mapped[Optional[int]] = mapped_column(ForeignKey("cart.id"))
    order_uuid: Mapped[str] = mapped_column(String(200), nullable=False)
    created_date: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_date: Mapped[datetime] = mapped_column(onupdate=func.now(), nullable=True)

    cart: Mapped["Cart"] = relationship(back_populates="order")
    #cart = relationship("Cart", back_populates="order")

@dataclass
class CartItem(db.Model):
    __tablename__ = "cart_item"
    id: Mapped[int] = mapped_column(primary_key=True)
    cart_id: Mapped[Optional[int]] = mapped_column(ForeignKey('cart.id'))
    product_id: Mapped[Optional[int]] = mapped_column(ForeignKey('product.id'))
    quantity: Mapped[int] = mapped_column(nullable=False)
    is_deleted: Mapped[bool] = mapped_column(nullable=False, default=False)
    created_date: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_date: Mapped[datetime] = mapped_column(onupdate=func.now(), nullable=True)

    cart: Mapped[Optional["Cart"]] = relationship(back_populates="cart_items")
    product: Mapped[Optional["Product"]] = relationship(back_populates="cart_items")
    #cart = relationship("Cart", back_populates="cart_items")
    #product = relationship("Product", back_populates="cart_items")

if __name__ == "__main__":
    customer = Customer(name='mumi')
    cart = Cart(customer=customer)
    product = Product(name='product1', price=10.5, tag='special', pic_ref='https://localhost:5555')
    cart_item = CartItem(cart=cart, product=product, quantity=1)
    print(customer.id)
    print(customer.name)
    print(cart.id)
    print(product.id)
    print(cart_item.id)