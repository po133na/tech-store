import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_CART_URL = 'http://localhost:5003/cart';

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_CART_URL);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch cart items');
    }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id, thunkAPI) => {
    try {
        await axios.delete(`${API_CART_URL}/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to remove item');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default cartSlice.reducer;
