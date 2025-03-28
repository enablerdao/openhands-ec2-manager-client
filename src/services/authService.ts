import api from './api';
import { User } from '../types';

// ユーザー登録
export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

// ログイン
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// 現在のユーザー情報を取得
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// ローカルストレージからユーザー情報を取得
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('ユーザー情報の解析エラー:', error);
      return null;
    }
  }
  return null;
};

// ローカルストレージからトークンを取得
export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

// ユーザー情報とトークンをローカルストレージに保存
export const storeUserAndToken = (user: User, token: string) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

// ローカルストレージからユーザー情報とトークンを削除
export const clearUserAndToken = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};