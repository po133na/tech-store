import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, removeCartItem } from '../../store/slices/cartSlice'; // Import Redux actions
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();

    const { cartItems, loading, error } = useSelector((state) => state.cart);

    React.useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleRemoveItem = (id) => {
        console.log('Removing item with id:', id); 
        dispatch(removeCartItem(id));
    };

    const totalItems = useMemo(() => cartItems.length, [cartItems]);
    const totalPrice = useMemo(() => {
        return cartItems
            .reduce((sum, item) => {
                const price = parseFloat(item.price.replace('$', ''));
                return sum + price;
            }, 0)
            .toFixed(2);
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
