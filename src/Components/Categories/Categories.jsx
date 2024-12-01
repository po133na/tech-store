import React, { useEffect, useCallback, useMemo, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice'; // Redux action for categories
import { fetchProducts, filterProductsByCategory } from '../../store/slices/productsSlice';
import withLogging from './withLogging';
import './Categories.css';

export const CategoriesContext = createContext();

const Categories = ({ handleLog }) => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const products = useSelector((state) => state.products.products);
    const filteredProducts = useSelector((state) => state.products.filteredProducts);
    const selectedCategory = useSelector((state) => state.products.selectedCategory);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        handleLog('Categories and products fetched successfully using Redux');
    }, [dispatch, handleLog]);

    const handleCategorySelect = useCallback((category) => {
        dispatch(filterProductsByCategory(category));
        handleLog(`Selected category: ${category}`);
    }, [dispatch, handleLog]);

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
