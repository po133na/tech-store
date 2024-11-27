import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import products from '../models/products.model';
import './ProductDetails.css';

const API_CART_URL = 'http://localhost:5003/cart';

const ProductDetails = () => {
    const { productId } = useParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const product = useMemo(() => {
        return products.find((product) => product.id === Number(productId));
    }, [productId]);

    useEffect(() => {
        if (product) {
            setLoading(false);
        }
    }, [product]);

    const handleAddToCart = async () => {
        try {
            await axios.post(API_CART_URL, product);
            setMessage('Product added to cart successfully!');
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            setMessage('Failed to add product to cart. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!product) {
        return <div>Product is not found</div>;
    }

    return (
        <>
            <div className="body-container">
                <div className="product-details">
                    <h2>{product.name}</h2>
                    <p><strong>Price:</strong> {product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    {message && <p className="message">{message}</p>}
                </div>
                <div className="photo-item">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
