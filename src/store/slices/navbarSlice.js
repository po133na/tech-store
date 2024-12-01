import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        menu: 'shop',
        sidebar: false,
    },
    reducers: {
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
    },
});

export const { setMenu, toggleSidebar } = navbarSlice.actions;
export default navbarSlice.reducer;
