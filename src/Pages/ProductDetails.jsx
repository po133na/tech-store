import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import products from '../models/products.model';
import './ProductDetails.css'


const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchProduct = () => {
            const foundProduct = products.find((product) => product.id === Number(productId));
            setProduct(foundProduct);
            setLoading(false); 
        };
        fetchProduct();
    }, [productId]);

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
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
                <p>Description: {product.description || 'No description available.'}</p>
            </div>
            <div className="photo-item"> 
                <img src={product.image} alt={product.name} /> 
            </div>
         </div>
         </>
    );
};

export default ProductDetails;
