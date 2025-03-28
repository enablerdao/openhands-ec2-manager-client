import api from './api';
import { AwsCredentials, AwsRegion } from '../types';

// AWS認証情報を保存
export const saveAwsCredentials = async (credentials: AwsCredentials) => {
  const response = await api.post('/aws/credentials', credentials);
  return response.data;
};

// AWS認証情報を取得
export const getAwsCredentials = async () => {
  const response = await api.get('/aws/credentials');
  return response.data;
};

// AWS認証情報を更新
export const updateAwsCredentials = async (credentials: AwsCredentials) => {
  const response = await api.put('/aws/credentials', credentials);
  return response.data;
};

// AWSリージョン一覧を取得
export const getAwsRegions = async (): Promise<AwsRegion[]> => {
  const response = await api.get('/aws/regions');
  return response.data.regions;
};