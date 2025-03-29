import api from './api';
import { Instance, CreateInstanceParams } from '../types/instance';

// インスタンス一覧を取得
export const fetchInstances = async (): Promise<Instance[]> => {
  try {
    const response = await api.get('/instances');
    return response.data.instances;
  } catch (error) {
    console.error('Error fetching instances:', error);
    throw error;
  }
};

// インスタンス詳細を取得
export const fetchInstanceById = async (id: string): Promise<Instance> => {
  try {
    const response = await api.get(`/instances/${id}`);
    return response.data.instance;
  } catch (error) {
    console.error(`Error fetching instance ${id}:`, error);
    throw error;
  }
};

// 新規インスタンスを作成
export const createInstance = async (params: CreateInstanceParams): Promise<Instance> => {
  try {
    const response = await api.post('/instances', {
      name: params.name,
      instanceType: params.instanceType,
      region: params.region,
      elasticIP: params.elasticIP,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
};

// インスタンスを起動
export const startInstance = async (id: string): Promise<Instance> => {
  try {
    const response = await api.post(`/instances/${id}/start`);
    return response.data;
  } catch (error) {
    console.error(`Error starting instance ${id}:`, error);
    throw error;
  }
};

// インスタンスを停止
export const stopInstance = async (id: string): Promise<Instance> => {
  try {
    const response = await api.post(`/instances/${id}/stop`);
    return response.data;
  } catch (error) {
    console.error(`Error stopping instance ${id}:`, error);
    throw error;
  }
};

// インスタンスを終了
export const terminateInstance = async (id: string): Promise<Instance> => {
  try {
    const response = await api.post(`/instances/${id}/terminate`);
    return response.data;
  } catch (error) {
    console.error(`Error terminating instance ${id}:`, error);
    throw error;
  }
};

// Elastic IPを関連付け
export const associateElasticIP = async (id: string): Promise<Instance> => {
  try {
    const response = await api.post(`/instances/${id}/elastic-ip/associate`);
    return response.data;
  } catch (error) {
    console.error(`Error associating Elastic IP to instance ${id}:`, error);
    throw error;
  }
};

// Elastic IPの関連付けを解除
export const disassociateElasticIP = async (id: string, allocationId: string): Promise<Instance> => {
  try {
    const response = await api.post(`/instances/${id}/elastic-ip/disassociate`, { allocationId });
    return response.data;
  } catch (error) {
    console.error(`Error disassociating Elastic IP from instance ${id}:`, error);
    throw error;
  }
};