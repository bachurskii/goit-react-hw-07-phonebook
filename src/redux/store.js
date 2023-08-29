import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './contactSlice';

export default configureStore({
  reducer: {
    contacts: contactSlice,
  },
});
