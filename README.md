# ✨ AIコンシェルジュ ✨

音声対話型のAIアシスタントアプリケーションです。Web Speech APIを使用した音声認識と、Perplexity AI APIを活用した知識検索機能を提供します。

<img width="500" alt="AIコンシェルジュ" src="https://github.com/user-attachments/assets/e616a445-784d-480b-8b13-42873597e494" />

## 🚀 機能

- **音声対話**: マイクボタンを押して話しかけるだけでAIと対話
- **3Dキャラクター**: Three.jsで作成されたアニメーションキャラクター
- **リアルタイム音声合成**: AIの回答を音声で再生
- **知識検索**: 質問内容に応じてPerplexity AI APIでリアルタイム情報を取得
- **美しいUI**: グラデーションとアニメーションを活用したモダンなデザイン

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **3Dグラフィックス**: Three.js, React Three Fiber
- **状態管理**: Zustand
- **音声処理**: Web Speech API
- **AI API**: Perplexity AI

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/io0323/ai-concierge.git
cd ai-concierge

# 依存関係をインストール
npm install
```

## ⚙️ 環境設定

1. **Perplexity AI APIキーの取得**
   - [Perplexity AI](https://www.perplexity.ai/)でアカウントを作成
   - APIキーを取得

2. **環境変数の設定**
   ```bash
   # .env.localファイルを作成
   touch .env.local
   ```

   `.env.local`に以下を追加：
   ```
   PERPLEXITY_API_KEY=your_perplexity_api_key_here
   ```

   **⚠️ 重要**: 実際のAPIキーは絶対にGitにコミットしないでください！

## 🚀 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 🎯 使用方法

1. **音声対話の開始**
   - 画面下部の「💬 話しかける」ボタンをクリック
   - マイクへのアクセス許可を承認
   - 質問や会話を開始

2. **知識検索機能**
   - 「何時」「いつ」「誰」「どこ」「何日」「曜日」などのキーワードを含む質問をすると、Perplexity AI APIが自動的に呼び出されます
   - リアルタイムで最新の情報を取得して回答

3. **3Dキャラクター**
   - AIが考えている間、キャラクターがアニメーションします
   - 音声合成中もキャラクターが反応します

## 📁 プロジェクト構造

```
ai-concierge/
├── src/
│   ├── app/
│   │   ├── page.tsx          # メインページ
│   │   ├── layout.tsx        # レイアウト
│   │   └── globals.css       # グローバルスタイル
│   └── components/
│       └── CharacterCanvas.tsx # 3Dキャラクター
├── pages/
│   └── api/
│       └── perplexity.ts     # Perplexity AI API
├── public/
│   └── models/
│       └── bunny.glb         # 3Dモデル
└── .env.local                # 環境変数（非公開）
```

## 🔧 ビルドとデプロイ

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 🌟 特徴

- **レスポンシブデザイン**: 様々な画面サイズに対応
- **アクセシビリティ**: 音声インターフェースで視覚障害者にも配慮
- **パフォーマンス**: Next.jsの最適化機能を活用
- **セキュリティ**: APIキーは環境変数で安全に管理

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🔗 リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Perplexity AI API](https://docs.perplexity.ai/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
