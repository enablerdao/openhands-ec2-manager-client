import api from './api';
import { SecurityGroup, SecurityGroupRule } from '../types';

// セキュリティグループ一覧を取得
export const getSecurityGroups = async () => {
  const response = await api.get('/security-groups');
  return response.data.securityGroups;
};

// セキュリティグループを作成
export const createSecurityGroup = async (params: {
  groupName: string;
  description?: string;
  vpcId?: string;
  inboundRules?: SecurityGroupRule[];
}) => {
  const response = await api.post('/security-groups', params);
  return response.data;
};

// セキュリティグループ詳細を取得
export const getSecurityGroup = async (groupId: string) => {
  const response = await api.get(`/security-groups/${groupId}`);
  return response.data.securityGroup;
};