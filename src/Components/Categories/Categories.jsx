import React, { useState, useEffect, useCallback, useMemo } from 'react';
import withLogging from './withLogging';
import './Categories.css';

const Categories= ({ handleLog }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const categories = ['Whole Beans', 'Ground Coffee', 'Milk', 'Coffee Machines', 'Mugs', 'Pitchers'];

    const products = useMemo(() => [
        { id: 1, name: 'Arabica Whole Beans', category: 'Whole Beans', price: '$20', image: '/images/beans.jpg' },
        { id: 2, name: 'Robusta Whole Beans', category: 'Whole Beans', price: '$18', image: '/images/beans.jpg' },
        { id: 3, name: 'Ground Arabica Coffee', category: 'Ground Coffee', price: '$15', image: '/images/ground.jpg' },
        { id: 4, name: 'Ground Robusta Coffee', category: 'Ground Coffee', price: '$12', image: '/images/ground.jpg' },
        { id: 5, name: 'Milk', category: 'Milk', price: '$3', image: '/images/milk.jpg' },
        { id: 6, name: 'DeLonghi Coffee Machine', category: 'Coffee Machines', price: '$300', image: '/images/coffee_machine.jpg' },
        { id: 7, name: 'Ceramic Mug', category: 'Mugs', price: '$10', image: '/images/mug.jpg' },
        { id: 8, name: 'Metal Pitcher', category: 'Pitchers', price: '$25', image: '/images/pitcher.jpg' },
    ], []);

    const handleCategorySelect = useCallback((category) => {
        setSelectedCategory(category);
        handleLog(`Selected category: ${category}`);
    }, [handleLog]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
            handleLog('Products filtered by category');
        }
    }, [selectedCategory, products, handleLog]);

    useEffect(() => {
        handleLog('CategoriesPage component mounted');
    }, [handleLog]);

    const categoryList = useMemo(() => (
        categories.map((category) => (
            <button key={category} onClick={() => handleCategorySelect(category)} className="category-button">
                {category}
            </button>
        ))
    ), [categories, handleCategorySelect]);

    return (
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
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image"/>
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-price">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default withLogging(Categories);
