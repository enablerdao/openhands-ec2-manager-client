import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Reduxストアの設定
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // 他のリデューサーをここに追加
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// RootStateとAppDispatchの型定義
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;