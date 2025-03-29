import React from 'react';

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ヘルプ＆ガイド</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">OpenHandsクラウドの使い方</h2>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <h3>はじめに</h3>
              <p>
                OpenHandsクラウドは、オープンソースのAIエンジニアリングアシスタント「OpenHands」をクラウド上で簡単に利用できるプラットフォームです。
                AWS EC2インスタンス上にOpenHandsを自動的にセットアップし、ブラウザからすぐに利用できます。
              </p>

              <h3>インスタンスの作成</h3>
              <ol>
                <li>「インスタンス管理」ページから「新規インスタンス作成」ボタンをクリックします。</li>
                <li>インスタンス名、インスタンスタイプ、リージョンを選択します。</li>
                <li>必要に応じて、Elastic IP（固定IPアドレス）の割り当てを設定します。</li>
                <li>「インスタンスを作成」ボタンをクリックします。</li>
                <li>インスタンスの作成には数分かかります。作成が完了すると、インスタンス一覧に表示されます。</li>
              </ol>

              <h3>OpenHandsへのアクセス</h3>
              <ol>
                <li>インスタンスが「実行中」状態になったら、インスタンス詳細ページの「OpenHandsを開く」ボタンをクリックします。</li>
                <li>初回アクセス時に、AnthropicまたはOpenAIのAPIキーを設定します。</li>
                <li>APIキーを設定すると、OpenHandsを利用できるようになります。</li>
              </ol>

              <h3>インスタンスの管理</h3>
              <p>
                インスタンス詳細ページでは、以下の操作が可能です：
              </p>
              <ul>
                <li><strong>起動</strong>：停止中のインスタンスを起動します。</li>
                <li><strong>停止</strong>：実行中のインスタンスを停止します。停止中はコンピューティング料金は発生しませんが、ストレージ料金は発生します。</li>
                <li><strong>終了</strong>：インスタンスを完全に終了します。この操作は取り消せず、すべてのデータが失われます。</li>
                <li><strong>Elastic IPの割り当て/解除</strong>：固定IPアドレスの割り当てや解除を行います。</li>
              </ul>

              <h3>料金について</h3>
              <p>
                OpenHandsクラウドの利用には、AWS EC2の料金が発生します。料金は選択したインスタンスタイプとリージョンによって異なります。
                不要になったインスタンスは必ず停止または終了してください。
              </p>
              <p>
                また、OpenHandsの利用には、AnthropicまたはOpenAIのAPIキーが必要です。APIの利用料金は別途発生します。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">よくある質問</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">インスタンスの作成に失敗する場合</h3>
                <p className="mt-2 text-gray-600">
                  AWS認証情報が正しく設定されているか確認してください。また、AWSアカウントのEC2インスタンス制限に達している可能性もあります。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">OpenHandsにアクセスできない場合</h3>
                <p className="mt-2 text-gray-600">
                  インスタンスが「実行中」状態であることを確認してください。また、セキュリティグループでポート3000が開放されていることを確認してください。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">APIキーの設定方法</h3>
                <p className="mt-2 text-gray-600">
                  OpenHandsにアクセスすると、初回起動時にAPIキーの設定画面が表示されます。AnthropicまたはOpenAIのAPIキーを入力してください。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">インスタンスを停止すると何が起こりますか？</h3>
                <p className="mt-2 text-gray-600">
                  インスタンスを停止すると、コンピューティング料金は発生しなくなりますが、ストレージ料金は引き続き発生します。
                  インスタンスを再起動すると、同じデータが保持されています。ただし、Elastic IPを割り当てていない場合、IPアドレスは変わる可能性があります。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">インスタンスを終了すると何が起こりますか？</h3>
                <p className="mt-2 text-gray-600">
                  インスタンスを終了すると、そのインスタンスに関連するすべてのデータが削除され、料金の発生が停止します。
                  この操作は取り消せないため、重要なデータがある場合は事前にバックアップを取ってください。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">サポート</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              ご質問やサポートが必要な場合は、以下のリソースをご利用ください：
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/All-Hands-AI/OpenHands/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.172 9.172a4 4 0 015.656 0 1 1 0 10-1.414 1.414 2 2 0 00-2.828 0 1 1 0 11-1.414-1.414zM10 12a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
                  </svg>
                  GitHub Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/All-Hands-AI/OpenHands/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-6a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2zm-6-5a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  GitHub Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://docs.all-hands.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  OpenHands ドキュメント
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;