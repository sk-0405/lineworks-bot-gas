require('dotenv').config();
const { execSync } = require('child_process');

const keys = [
  'CLIENT_ID',
  'CLIENT_SECRET',
  'SERVICE_ACCOUNT',
  'BOT_PRIVATE_KEY',
  'BOT_ID',
  'CHANNEL_ID',
  'SPREADSHEET_ID',
  'SPREADSHEET_URL'
];

(async () => {
  console.log('🚀 GAS スクリプトプロパティを設定中...');

  for (const key of keys) {
    const value = process.env[key];
    if (!value) {
      console.warn(`⚠ 環境変数 ${key} が見つかりません`);
      continue;
    }

    const safeValue = value.replace(/\n/g, '\\n').replace(/"/g, '\\"');

    try {
      console.log(`🔄 ${key} を同期中...`);
      execSync(
        `clasp run 'setProp' --params '["${key}", "${safeValue}"]'`,
        { stdio: 'inherit' }
      );
    } catch (err) {
      console.error(`❌ ${key} の同期に失敗しました`, err.message);
    }
  }

  console.log('✅ すべてのプロパティを設定しました');
})();
