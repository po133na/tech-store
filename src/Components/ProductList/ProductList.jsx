import React, { useCallback, useEffect, useMemo } from 'react';
import products from '../../models/products.model';
import { Link } from 'react-router-dom';
import './ProductList.css';
import withAuth from "../Signup/withAuth";
import plus from '../Assets/plus.png';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/slices/productListSlice';

const ProductList = () => {
    const searchQuery = useSelector((state) => state.productList.searchQuery);
    const dispatch = useDispatch();

    const handleSearch = useCallback((e) => {
        dispatch(setSearchQuery(e.target.value.toLowerCase()));
    }, [dispatch]);

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
                value={searchQuery}  
            />
            <Link to="/account" className="account-link">
                Go to Account Page
            </Link>
            <div className="product-cards">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img className='plus' src={plus} alt="" />
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
