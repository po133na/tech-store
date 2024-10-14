import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import products from '../models/products.model';
import './ProductDetails.css'

const ProductDetails = () => {
    const { productId } = useParams();
    const [loading, setLoading] = useState(true);

    const product = useMemo(() => {
        return products.find((product) => product.id === Number(productId));
    }, [productId]);

    useEffect(() => {
        if (product) {
            setLoading(false); 
        }
    }, [product]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!product) {
        return <div>Product is not found</div>;
    }

    return (
        <>
            <div className='body-container'>
                <div className="product-details">
                    <h2>{product.name}</h2>
                    <p><strong>Price:</strong> {product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
                </div>
                <div className="photo-item"> 
                    <img src={product.image} alt={product.name} /> 
                </div>
            </div>
        </>
    );
};

export default ProductDetails;

