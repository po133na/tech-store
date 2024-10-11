import React from 'react';
import products from '../models/products.model'; 
import { Link } from 'react-router-dom';
import './ProductList.css'; 

const ProductList = () => {
    return (
        <div className="product-list">
            <h2>All Products Available</h2>
            <div className="product-cards">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-price">{product.price}</p>
                        <Link to={`/categories/${product.id}`} className="product-details-link">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
