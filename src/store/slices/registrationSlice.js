import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    formData: {
      username: '',
      password: '',
      email: '',
      phone: '',
    },
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearFormData: (state) => {
      state.formData = {
        username: '',
        password: '',
        email: '',
        phone: '',
      };
    },
  },
});

export const { setFormData, clearFormData } = registrationSlice.actions;
export default registrationSlice.reducer;
