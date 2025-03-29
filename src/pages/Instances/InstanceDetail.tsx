import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchInstanceById, 
  startInstance, 
  stopInstance, 
  terminateInstance,
  associateElasticIP,
  disassociateElasticIP
} from '../../services/instanceService';
import { Instance } from '../../types/instance';

const InstanceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [instance, setInstance] = useState<Instance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [showTerminateConfirm, setShowTerminateConfirm] = useState<boolean>(false);

  useEffect(() => {
    const loadInstance = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchInstanceById(id);
        setInstance(data);
        setError(null);
      } catch (err) {
        setError('インスタンスの読み込み中にエラーが発生しました。');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstance();
    // 15秒ごとに更新
    const interval = setInterval(loadInstance, 15000);
    return () => clearInterval(interval);
  }, [id]);

  const handleStart = async () => {
    if (!instance) return;
    
    try {
      setActionInProgress('start');
      await startInstance(instance.id);
      setInstance({ ...instance, state: 'pending' });
    } catch (err) {
      setError('インスタンスの起動中にエラーが発生しました。');
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleStop = async () => {
    if (!instance) return;
    
    try {
      setActionInProgress('stop');
      await stopInstance(instance.id);
      setInstance({ ...instance, state: 'stopping' });
    } catch (err) {
      setError('インスタンスの停止中にエラーが発生しました。');
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleTerminate = async () => {
    if (!instance) return;
    
    try {
      setActionInProgress('terminate');
      await terminateInstance(instance.id);
      setInstance({ ...instance, state: 'shutting-down' });
      setShowTerminateConfirm(false);
      // 5秒後にインスタンス一覧に戻る
      setTimeout(() => navigate('/instances'), 5000);
    } catch (err) {
      setError('インスタンスの終了中にエラーが発生しました。');
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleAssociateElasticIP = async () => {
    if (!instance) return;
    
    try {
      setActionInProgress('associate-ip');
      const updatedInstance = await associateElasticIP(instance.id);
      setInstance(updatedInstance);
    } catch (err) {
      setError('Elastic IPの関連付け中にエラーが発生しました。');
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDisassociateElasticIP = async () => {
    if (!instance || !instance.elasticIP) return;
    
    try {
      setActionInProgress('disassociate-ip');
      const updatedInstance = await disassociateElasticIP(instance.id, instance.elasticIP.allocationId);
      setInstance(updatedInstance);
    } catch (err) {
      setError('Elastic IPの関連付け解除中にエラーが発生しました。');
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  };

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

  if (isLoading && !instance) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !instance) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/instances')}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              インスタンス一覧に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!instance) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
            インスタンスが見つかりません。
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/instances')}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              インスタンス一覧に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{instance.name}</h1>
          <button
            onClick={() => navigate('/instances')}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            インスタンス一覧に戻る
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">インスタンス情報</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(instance.state)}`}>
                {getStatusText(instance.state)}
              </span>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">インスタンスID</h3>
              <p className="mt-1 text-sm text-gray-900">{instance.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">インスタンスタイプ</h3>
              <p className="mt-1 text-sm text-gray-900">{instance.instanceType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">リージョン</h3>
              <p className="mt-1 text-sm text-gray-900">{instance.region}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">作成日時</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(instance.createdAt).toLocaleString('ja-JP')}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">パブリックIPアドレス</h3>
              <p className="mt-1 text-sm text-gray-900">
                {instance.publicIp ? (
                  <a
                    href={`http://${instance.publicIp}:3000`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {instance.publicIp}
                  </a>
                ) : (
                  '割り当てなし'
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Elastic IP</h3>
              <p className="mt-1 text-sm text-gray-900">
                {instance.elasticIP ? (
                  <a
                    href={`http://${instance.elasticIP.publicIp}:3000`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {instance.elasticIP.publicIp}
                  </a>
                ) : (
                  '割り当てなし'
                )}
              </p>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3">
            {instance.state === 'stopped' && (
              <button
                onClick={handleStart}
                disabled={!!actionInProgress}
                className={`px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center ${
                  actionInProgress ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {actionInProgress === 'start' && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                起動
              </button>
            )}
            {instance.state === 'running' && (
              <button
                onClick={handleStop}
                disabled={!!actionInProgress}
                className={`px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors flex items-center ${
                  actionInProgress ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {actionInProgress === 'stop' && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                停止
              </button>
            )}
            {(instance.state === 'running' || instance.state === 'stopped') && (
              <button
                onClick={() => setShowTerminateConfirm(true)}
                disabled={!!actionInProgress}
                className={`px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center ${
                  actionInProgress ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                終了
              </button>
            )}
            {instance.state === 'running' && !instance.elasticIP && (
              <button
                onClick={handleAssociateElasticIP}
                disabled={!!actionInProgress}
                className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center ${
                  actionInProgress ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {actionInProgress === 'associate-ip' && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Elastic IPを割り当て
              </button>
            )}
            {instance.state === 'running' && instance.elasticIP && (
              <button
                onClick={handleDisassociateElasticIP}
                disabled={!!actionInProgress}
                className={`px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
                  actionInProgress ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {actionInProgress === 'disassociate-ip' && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Elastic IPの割り当てを解除
              </button>
            )}
          </div>
        </div>

        {instance.publicIp && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">アクセス情報</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">OpenHandsへのアクセス</h3>
                <div className="flex items-center">
                  <a
                    href={`http://${instance.elasticIP ? instance.elasticIP.publicIp : instance.publicIp}:3000`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                  >
                    OpenHandsを開く
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  初回アクセス時にAnthropicまたはOpenAIのAPIキーを設定してください。
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">SSHアクセス</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <code className="text-sm text-gray-800">
                    ssh -i OpenHands-Key.pem ubuntu@{instance.elasticIP ? instance.elasticIP.publicIp : instance.publicIp}
                  </code>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  SSHキーは安全な場所に保管してください。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 終了確認モーダル */}
        {showTerminateConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">インスタンスを終了しますか？</h3>
              <p className="text-gray-600 mb-6">
                この操作は取り消せません。インスタンスを終了すると、すべてのデータが失われます。
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowTerminateConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleTerminate}
                  disabled={actionInProgress === 'terminate'}
                  className={`px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center ${
                    actionInProgress === 'terminate' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {actionInProgress === 'terminate' && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  インスタンスを終了
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstanceDetailPage;