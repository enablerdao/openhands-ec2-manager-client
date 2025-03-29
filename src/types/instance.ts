export interface ElasticIP {
  allocationId: string;
  publicIp: string;
  associationId: string;
}

export interface Instance {
  id: string;
  name: string;
  instanceType: string;
  region: string;
  state: string;
  publicIp?: string;
  privateIp?: string;
  elasticIP?: ElasticIP;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstanceParams {
  name: string;
  instanceType: string;
  region: string;
  elasticIP: boolean;
}