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

console.log('🚀 GAS スクリプトプロパティを設定中...');

keys.forEach(key => {
  if (!process.env[key]) {
    console.warn(`⚠️ 環境変数 ${key} が見つかりません`);
  } else {
    execSync(`clasp run setProperty --params '["${key}", "${process.env[key].replace(/\n/g, '\\n')}"]'`, {
      stdio: 'inherit'
    });
  }
});

console.log('✅ すべてのプロパティを設定しました');
