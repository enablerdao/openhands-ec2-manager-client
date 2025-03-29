import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInstance } from '../../services/instanceService';

const instanceTypes = [
  { id: 't3.micro', name: 't3.micro', description: '2 vCPU, 1 GiB RAM - 無料枠対象', price: '0.0104 USD/時間' },
  { id: 't3.small', name: 't3.small', description: '2 vCPU, 2 GiB RAM', price: '0.0208 USD/時間' },
  { id: 't3.medium', name: 't3.medium', description: '2 vCPU, 4 GiB RAM', price: '0.0416 USD/時間' },
  { id: 't3.large', name: 't3.large', description: '2 vCPU, 8 GiB RAM', price: '0.0832 USD/時間' },
  { id: 't3.xlarge', name: 't3.xlarge', description: '4 vCPU, 16 GiB RAM', price: '0.1664 USD/時間' },
];

const regions = [
  { id: 'ap-northeast-1', name: '東京 (ap-northeast-1)' },
  { id: 'us-east-1', name: '米国東部（バージニア北部） (us-east-1)' },
  { id: 'us-west-2', name: '米国西部（オレゴン） (us-west-2)' },
  { id: 'eu-west-1', name: 'ヨーロッパ（アイルランド） (eu-west-1)' },
];

const NewInstancePage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [instanceType, setInstanceType] = useState<string>('t3.large');
  const [region, setRegion] = useState<string>('ap-northeast-1');
  const [isElasticIP, setIsElasticIP] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('インスタンス名を入力してください。');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await createInstance({
        name,
        instanceType,
        region,
        elasticIP: isElasticIP,
      });
      
      navigate('/instances');
    } catch (err) {
      setError('インスタンスの作成中にエラーが発生しました。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">新規インスタンス作成</h1>
          <p className="mt-2 text-gray-600">
            新しいOpenHandsインスタンスを作成します。インスタンスの作成には数分かかる場合があります。
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              インスタンス名
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="例: my-openhands-instance"
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="instanceType" className="block text-sm font-medium text-gray-700 mb-1">
              インスタンスタイプ
            </label>
            <div className="grid grid-cols-1 gap-4">
              {instanceTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    instanceType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setInstanceType(type.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`type-${type.id}`}
                      name="instanceType"
                      value={type.id}
                      checked={instanceType === type.id}
                      onChange={() => setInstanceType(type.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <label htmlFor={`type-${type.id}`} className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-900">{type.name}</span>
                      <span className="block text-sm text-gray-500">{type.description}</span>
                    </label>
                    <span className="text-sm font-medium text-gray-900">{type.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              リージョン
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            >
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="elasticIP"
                checked={isElasticIP}
                onChange={(e) => setIsElasticIP(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="elasticIP" className="ml-2 block text-sm text-gray-900">
                Elastic IP（固定IPアドレス）を割り当てる
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              固定IPアドレスを使用すると、インスタンスを再起動してもIPアドレスが変わりません。
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/instances')}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors mr-4"
              disabled={isLoading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              インスタンスを作成
            </button>
          </div>
        </form>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">料金について</h2>
          <p className="text-blue-700 mb-4">
            インスタンスの使用には、AWS EC2の料金が発生します。料金は選択したインスタンスタイプとリージョンによって異なります。
          </p>
          <p className="text-blue-700 mb-2">
            不要になったインスタンスは必ず停止または終了してください。停止中のインスタンスはストレージ料金のみが発生します。
          </p>
          <a
            href="https://aws.amazon.com/jp/ec2/pricing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium inline-flex items-center"
          >
            AWS EC2の料金詳細を見る
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewInstancePage;