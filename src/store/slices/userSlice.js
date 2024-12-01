import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const login = (userData) => (dispatch) => {
    // Perform login logic (e.g., saving user to localStorage)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(userData));
    dispatch(setUser(userData));
};

export default userSlice.reducer;
