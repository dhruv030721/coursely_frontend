import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import courseReducer from './slices/course.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
