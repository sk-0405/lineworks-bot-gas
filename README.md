# LINE WORKS Bot Google Form Notification (GAS + Node.js)

Googleフォームに回答が追加されたら、LINE WORKS Botに通知する仕組みです。  
Googleスプレッドシートのリンクと一緒にメッセージをBotが投稿します。

---

## ✅ 機能概要
- Googleフォーム送信時にトリガー発火
- GASでLINE WORKS APIを呼び出し、Botからチャットにメッセージ送信
- JWT + OAuth2認証をGAS内で実装
- `.env` → GAS スクリプトプロパティに自動反映（Node.js + clasp）

---

## ✅ 必要なもの  
- Googleアカウント（GAS実行用）
- LINE WORKS Developer Console アカウント
- `Node.js` + `npm` + `clasp`  
  ```bash
  npm install -g @google/clasp
  ```

## セットアップ手順

1. リポジトリをクローン
```bash
git clone https://github.com/yourname/lineworks-bot-gas.git
cd lineworks-bot-gas
```

2. .envを作成  

以下をコピーして .env を作成してください。  

```env
CLIENT_ID=xxxxxxxx
CLIENT_SECRET=xxxxxxxx
SERVICE_ACCOUNT=xxxxxxxx
BOT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXXXX\n-----END PRIVATE KEY-----"
BOT_ID=xxxxxxxx
CHANNEL_ID=xxxxxxxx
SPREADSHEET_ID=xxxxxxxx
SPREADSHEET_URL=https://docs.google.com/spreadsheets/d/xxxxxxxx
```

### 値の取得先

- CLIENT_ID, CLIENT_SECRET → LINE WORKS Developer Console
- SERVICE_ACCOUNT → Botのサービスアカウント
- BOT_PRIVATE_KEY → ダウンロードした.keyファイルの中身
- BOT_ID → BotのID
- CHANNEL_ID → 通知先のトークルームID
- SPREADSHEET_ID → GoogleスプレッドシートID
- SPREADSHEET_URL → スプレッドシートURL

3. GASプロジェクトを作成
```bash
clasp create --type standalone --title "LINEWORKS Bot Notify"
```
4. スクリプトをアップロード
```bash
clasp push
```
5. .envをGASプロパティに反映
```bash
npm install
node set-props.js
```
6. トリガー作成  
GASのエディタで次を実行:

```scss
createOnFormSubmitTrigger()
```

7. 動作確認
- Googleフォームに回答
- LINE WORKS Botに通知が届く ✅

## ✅ ファイル構成
```cpp
├── main.gs          // メイン処理（onFormSubmit）
├── auth.gs          // JWT生成 & アクセストークン取得
├── message.gs       // Botメッセージ送信
├── trigger.gs       // トリガー管理
├── utils.gs         // 共通関数（スクリプトプロパティ）
├── set-props.js     // .env → GASプロパティ設定
├── .env             // 環境変数
├── appsscript.json  // GASマニフェスト
└── README.md
```
## ✅ 実装ポイント
- JWT署名はGASのUtilities.computeRsaSha256Signatureで実装
- アクセストークンは毎回フォーム送信時に取得（有効期限1時間）
- Googleフォーム送信イベントをonFormSubmitで処理
- 環境変数は.env管理、Node.jsスクリプトでGASプロパティに同期

