import { createSlice } from '@reduxjs/toolkit';

const filteredProductsSlice = createSlice({
  name: 'filteredProducts',
  initialState: [],
  reducers: {
    setFilteredProducts: (state, action) => {
      return action.payload; 
    },
    clearFilteredProducts: () => {
      return []; 
    },
  },
});

export const { setFilteredProducts, clearFilteredProducts } = filteredProductsSlice.actions;
export default filteredProductsSlice.reducer;
