import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5002/categories';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export default categoriesSlice.reducer;
