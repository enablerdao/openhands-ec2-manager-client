import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            OpenHands <span className="text-blue-600">クラウド</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            オープンソースAIエンジニアリングアシスタントをクラウドで簡単に利用できるプラットフォーム
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/instances"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              インスタンス管理へ
            </Link>
            <a
              href="https://github.com/All-Hands-AI/OpenHands"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              GitHubを見る
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">主な機能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">簡単セットアップ</h3>
            <p className="text-gray-600">
              数クリックでOpenHandsインスタンスを起動。APIキーを設定するだけですぐに使えます。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">安全なインフラ</h3>
            <p className="text-gray-600">
              AWS上に独立したインスタンスを作成。あなたのデータは他のユーザーと共有されません。
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">フル機能対応</h3>
            <p className="text-gray-600">
              コード生成、実行環境、ファイル管理など、OpenHandsのすべての機能をクラウドで利用できます。
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">使い方</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">インスタンスを作成</h3>
            <p className="text-gray-600">
              インスタンス管理から「新規インスタンス作成」ボタンをクリックし、必要な情報を入力します。
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">APIキーを設定</h3>
            <p className="text-gray-600">
              OpenHandsにアクセスし、AnthropicまたはOpenAIのAPIキーを設定します。
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">開発を始める</h3>
            <p className="text-gray-600">
              AIアシスタントと対話しながら、コードの作成、実行、デバッグを行います。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-blue-600 text-white rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">今すぐOpenHandsを始めよう</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            数分でAIエンジニアリングアシスタントを立ち上げ、開発効率を劇的に向上させましょう。
          </p>
          <Link
            to="/instances/new"
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block"
          >
            インスタンスを作成する
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;