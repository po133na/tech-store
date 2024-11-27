import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './Cart.css';

const API_CART_URL = 'http://localhost:5003/cart';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(API_CART_URL);
                setCartItems(response.data);
            } catch (err) {
                console.error('Failed to fetch cart items:', err);
                setError('Failed to load cart items. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`${API_CART_URL}/${id}`);
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (err) {
            console.error('Failed to remove item from cart:', err);
            setError('Failed to remove item. Please try again.');
        }
    };

    const totalItems = useMemo(() => cartItems.length, [cartItems]);
    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + price;
        }, 0).toFixed(2);
    }, [cartItems]);

    const handlePlaceOrder = () => {
        alert('Order placed successfully! Thank you for your purchase.');
    };

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (cartItems.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            <div className="cart-summary">
                <p>Total Items: <strong>{totalItems}</strong></p>
                <p>Total Price: <strong>${totalPrice}</strong></p>
            </div>

            <ul className="cart-items">
                {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                        <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <p>Price: {item.price}</p>
                            <p>Category: {item.category}</p>
                        </div>
                        <button
                            className="remove-btn"
                            onClick={() => handleRemoveItem(item.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className="cart-footer">
                <h3>Order Information</h3>
                <p>Once you place your order, our team will contact you to confirm the details.</p>
                <button className="order-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
