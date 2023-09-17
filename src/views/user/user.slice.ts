import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('mode'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeMode: (state) => {
      if (!state.mode || state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
