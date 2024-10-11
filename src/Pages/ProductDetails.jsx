import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../models/products.model';

const ProductDetails = () => {
    const { productId } = useParams();

    const product = products.find((product) => product.id === Number(productId));

    if (!product) {
        return <div>Product is not found</div>;
    }

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description || 'No description available.'}</p>
        </div>
    );
};

export default ProductDetails;
