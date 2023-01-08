import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import themReducer from './slices/themSlice';
import { newsService } from '@services/studentService';

export const store = configureStore({
  reducer: {
    theme: themReducer,
    [newsService.reducerPath]: newsService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([newsService.middleware]),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
