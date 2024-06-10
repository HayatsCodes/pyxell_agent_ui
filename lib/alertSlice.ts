// store/alertSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertState {
  message: string;
  color: string; // Using string type as the color type from @material-tailwind/react
}

const initialState: AlertState = {
  message: '',
  color: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; color: string }>) => {
      state.message = action.payload.message;
      state.color = action.payload.color;
    },
    clearAlert: (state) => {
      state.message = '';
      state.color = '';
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;