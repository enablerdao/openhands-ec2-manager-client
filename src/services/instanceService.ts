import api from './api';
import { Instance } from '../types';

// インスタンス一覧を取得
export const getInstances = async () => {
  const response = await api.get('/instances');
  return response.data.instances;
};

// インスタンスを起動
export const launchInstance = async (params: {
  imageId: string;
  instanceType: string;
  keyName: string;
  securityGroupIds: string[];
  name?: string;
}) => {
  const response = await api.post('/instances', params);
  return response.data;
};

// インスタンス詳細を取得
export const getInstance = async (instanceId: string) => {
  const response = await api.get(`/instances/${instanceId}`);
  return response.data.instance;
};

// インスタンスを起動（停止中のインスタンス）
export const startInstance = async (instanceId: string) => {
  const response = await api.post(`/instances/${instanceId}/start`);
  return response.data;
};

// インスタンスを停止
export const stopInstance = async (instanceId: string) => {
  const response = await api.post(`/instances/${instanceId}/stop`);
  return response.data;
};

// インスタンスを終了
export const terminateInstance = async (instanceId: string) => {
  const response = await api.delete(`/instances/${instanceId}`);
  return response.data;
};