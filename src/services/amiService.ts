import api from './api';
import { Ami } from '../types';

// AMI一覧を取得
export const getAmis = async (owner?: string, filters?: any) => {
  const params = new URLSearchParams();
  if (owner) {
    params.append('owner', owner);
  }
  if (filters) {
    params.append('filters', JSON.stringify(filters));
  }
  
  const response = await api.get(`/amis?${params.toString()}`);
  return response.data.amis;
};

// 推奨AMI一覧を取得
export const getRecommendedAmis = async () => {
  const response = await api.get('/amis/recommended');
  return response.data.recommendedAmis;
};