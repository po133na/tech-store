import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    filteredProducts: [],
    selectedCategory: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        filterProductsByCategory(state, action) {
            state.filteredProducts = state.products.filter(
                (product) => product.category === action.payload
            );
            state.selectedCategory = action.payload;
        },
    },
});

export const { setProducts, filterProductsByCategory } = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5002/products');
        const data = await response.json();
        dispatch(setProducts(data));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export default productsSlice.reducer;
