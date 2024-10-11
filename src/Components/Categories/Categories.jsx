import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import { Link } from 'react-router-dom';
import withLogging from './withLogging';
import './Categories.css';
import categories from '../../models/category.model'; 
import products from '../../models/products.model';

export const CategoriesContext = createContext();

const Categories = ({ handleLog }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

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
    }, [selectedCategory, handleLog]);

    useEffect(() => {
        handleLog('CategoriesPage component mounted');
    }, [handleLog]);

    const categoryList = useMemo(() => (
        categories.map((category) => (
            <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="category-button"
            >
                {category}
            </button>
        ))
    ), [handleCategorySelect]);

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
                    <h3>{selectedCategory ? `Products: ${selectedCategory}` : 'Select a category'}</h3>
                    <div className="product-cards">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-price">{product.price}</p>
                                    <Link to={`/categories/${product.id}`} className="product-details-link">
                                        View Details
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Tap one to see all the products.</p>
                        )}
                    </div>
                </section>
            </div>
        </CategoriesContext.Provider>
    );
};

export default withLogging(Categories);
