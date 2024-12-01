import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import heroReducer from './slices/heroSlice';
import navbarReducer from './slices/navbarSlice';
import productListReducer from './slices/productListSlice';
import registrationReducer from './slices/registrationSlice';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        user: userReducer,
        cart: cartReducer,
        hero: heroReducer,
        navbar: navbarReducer,
        productList: productListReducer,
        registration: registrationReducer,
    },
});

export default store;
