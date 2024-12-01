import { createSlice } from '@reduxjs/toolkit';

const heroSlice = createSlice({
    name: 'hero',
    initialState: {
        showDescription: true,
    },
    reducers: {
        toggleDescription: (state) => {
            state.showDescription = !state.showDescription;
        },
    },
});

export const { toggleDescription } = heroSlice.actions;
export default heroSlice.reducer;
