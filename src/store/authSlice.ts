import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';
import * as authService from '../services/authService';

// 初期状態
const initialState: AuthState = {
  user: authService.getStoredUser(),
  token: authService.getStoredToken(),
  isAuthenticated: !!authService.getStoredToken(),
  isLoading: false,
  error: null
};

// ユーザー登録
export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.register(username, email, password);
      authService.storeUserAndToken(response.user, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'ユーザー登録に失敗しました');
    }
  }
);

// ログイン
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      authService.storeUserAndToken(response.user, response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'ログインに失敗しました');
    }
  }
);

// 現在のユーザー情報を取得
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'ユーザー情報の取得に失敗しました');
    }
  }
);

// 認証スライス
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.clearUserAndToken();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // ユーザー登録
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // ログイン
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // 現在のユーザー情報を取得
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;