import React, {useCallback, useEffect, useMemo, useState} from 'react';
import products from '../../models/products.model';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');

    const memoizedProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleSearch = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    useEffect(() => {
        setFilteredProducts(memoizedProducts);
    }, [memoizedProducts]);

    return (
        <div className="product-list">
            <h2>All Products Available</h2>
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
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

export default ProductList;
