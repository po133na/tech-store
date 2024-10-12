import React, {useCallback, useEffect, useState} from 'react';
import products from '../../models/products.model';
import { Link } from 'react-router-dom';
import './ProductList.css';
import withAuth from "../Signup/withAuth";

const ProductList = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleSearch = useCallback((e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    }, []);

    useEffect(() => {
        console.log('ProductList mounted');
    }, []);

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
