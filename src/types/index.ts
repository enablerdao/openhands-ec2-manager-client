// ユーザー関連の型
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// AWS認証情報関連の型
export interface AwsCredentials {
  id?: number;
  accessKeyId: string;
  secretAccessKey?: string;
  region: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AwsRegion {
  regionName: string;
  endpoint: string;
}

// EC2インスタンス関連の型
export interface Instance {
  instanceId: string;
  name: string;
  state: string;
  publicIp?: string;
  privateIp?: string;
  instanceType: string;
  launchTime?: string;
  availabilityZone?: string;
  vpcId?: string;
  subnetId?: string;
  securityGroups?: SecurityGroupRef[];
  tags?: Tag[];
}

export interface SecurityGroupRef {
  id: string;
  name: string;
}

export interface Tag {
  key: string;
  value: string;
}

// AMI関連の型
export interface Ami {
  imageId: string;
  name: string;
  description?: string;
  state?: string;
  creationDate?: string;
  platform?: string;
  architecture?: string;
  rootDeviceType?: string;
  virtualizationType?: string;
  tags?: Tag[];
}

// セキュリティグループ関連の型
export interface SecurityGroup {
  groupId: string;
  groupName: string;
  description: string;
  vpcId?: string;
  inboundRules?: SecurityGroupRule[];
  outboundRules?: SecurityGroupRule[];
  tags?: Tag[];
}

export interface SecurityGroupRule {
  protocol: string;
  fromPort?: number;
  toPort?: number;
  ipRanges?: IpRange[];
}

export interface IpRange {
  cidrIp: string;
  description?: string;
}

// キーペア関連の型
export interface KeyPair {
  keyName: string;
  keyPairId?: string;
  keyFingerprint?: string;
  keyMaterial?: string;
  tags?: Tag[];
}

// API関連の型
export interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}