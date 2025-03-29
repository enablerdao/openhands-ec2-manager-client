import React from 'react';
import { Link } from 'react-router-dom';
import { Instance } from '../../types/instance';

interface InstanceCardProps {
  instance: Instance;
}

const InstanceCard: React.FC<InstanceCardProps> = ({ instance }) => {
  const getStatusColor = (state: string) => {
    switch (state) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'pending':
      case 'stopping':
      case 'shutting-down':
        return 'bg-yellow-100 text-yellow-800';
      case 'terminated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (state: string) => {
    switch (state) {
      case 'running':
        return '実行中';
      case 'stopped':
        return '停止中';
      case 'pending':
        return '起動中';
      case 'stopping':
        return '停止処理中';
      case 'shutting-down':
        return '終了処理中';
      case 'terminated':
        return '終了済み';
      default:
        return state;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{instance.name}</h2>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(instance.state)}`}>
            {getStatusText(instance.state)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500">インスタンスタイプ</p>
            <p className="text-sm font-medium text-gray-900">{instance.instanceType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">リージョン</p>
            <p className="text-sm font-medium text-gray-900">{instance.region}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">IPアドレス</p>
            <p className="text-sm font-medium text-gray-900">
              {instance.elasticIP ? instance.elasticIP.publicIp : instance.publicIp || '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">作成日時</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(instance.createdAt).toLocaleDateString('ja-JP')}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {instance.state === 'running' && (instance.elasticIP?.publicIp || instance.publicIp) && (
            <a
              href={`http://${instance.elasticIP ? instance.elasticIP.publicIp : instance.publicIp}:3000`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              OpenHandsを開く
            </a>
          )}
          <Link
            to={`/instances/${instance.id}`}
            className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstanceCard;