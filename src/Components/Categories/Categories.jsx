import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withLogging from './withLogging';
import './Categories.css';

export const CategoriesContext = createContext();

const API_URL = 'http://localhost:5002';

const Categories = ({ handleLog }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/categories`);
                setCategories(response.data);
                handleLog('Categories fetched successfully with axios');
            } catch (error) {
                console.error('Error fetching categories with axios:', error);
                handleLog('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, [handleLog]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data);
                handleLog('Products fetched successfully with axios');
            } catch (error) {
                console.error('Error fetching products with axios:', error);
                handleLog('Failed to fetch products');
            }
        };

        fetchProducts();
    }, [handleLog]);

    const handleCategorySelect = useCallback((category) => {
        setSelectedCategory(category);
        handleLog(`Selected category: ${category}`);
    }, [handleLog]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
            handleLog('Products filtered by category');
        } else {
            setFilteredProducts([]);
        }
    }, [selectedCategory, products, handleLog]);

    useEffect(() => {
        handleLog('CategoriesPage component mounted');
    }, [handleLog]);

    const categoryList = useMemo(() => (
        categories.map((category) => (
            <button
                key={category.id}
                onClick={() => handleCategorySelect(category.name)}
                className="category-button"
            >
                {category.name}
            </button>
        ))
    ), [categories, handleCategorySelect]);

    return (
        <CategoriesContext.Provider value={{ filteredProducts }}>
            <div className="categories-page">
                <aside className="categories-sidebar">
                    <h3>Categories</h3>
                    <div className="categories-list">
                        {categoryList}
                    </div>
                </aside>

                <section className="products-section">
                    <h3>{selectedCategory ? ` ${selectedCategory}` : 'Select a category'}</h3>
                    <div className="category-cards">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="category-card">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-price">{product.price}</p>
                                    <Link to={`/categories/${product.id}`} className="product-details-link">
                                        View Details
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="category-text">Choose category to see all the products.</p>
                        )}
                    </div>
                </section>
            </div>
        </CategoriesContext.Provider>
    );
};

export default withLogging(Categories);
