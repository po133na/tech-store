import React, { useCallback, useEffect, useState, useMemo } from 'react';
import products from '../../models/products.model';
import { Link } from 'react-router-dom';
import './ProductList.css';
import withAuth from "../Signup/withAuth";
import plus from '../Assets/plus.png'

const ProductList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((e) => {
        setSearchQuery(e.target.value.toLowerCase());
    }, []);

    useEffect(() => {
        console.log('ProductList mounted');
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <div className="product-list">
            <h2>All Products Available</h2>
            <input
                type="text"
                placeholder="Search for products..."
                className="search-input"
                onChange={handleSearch}
            />
            <div className="product-cards">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                                                < img className='plus' src={plus} alt="" /> 
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

export default withAuth(ProductList);
