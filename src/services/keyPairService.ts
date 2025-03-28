import api from './api';
import { KeyPair } from '../types';

// キーペア一覧を取得
export const getKeyPairs = async () => {
  const response = await api.get('/key-pairs');
  return response.data.keyPairs;
};

// キーペアを作成
export const createKeyPair = async (keyName: string) => {
  const response = await api.post('/key-pairs', { keyName });
  return response.data;
};

// キーペアを削除
export const deleteKeyPair = async (keyName: string) => {
  const response = await api.delete(`/key-pairs/${keyName}`);
  return response.data;
};