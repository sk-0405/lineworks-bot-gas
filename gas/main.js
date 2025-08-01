function onFormSubmit(e) {
  const accessToken = getAccessToken();
  const sheetUrl = getProp('SPREADSHEET_URL');
  const message = `📝 ヒヤリハット報告書が追加されました。\n確認はこちら👇\n${sheetUrl}`;
  sendMessageToRoom(accessToken, message);
}

/**
 * GASスクリプトプロパティをまとめて設定
 * @param {Object} props { KEY: VALUE, ... }
 */
function setProps(props) {
  const scriptProperties = PropertiesService.getScriptProperties();
  for (const key in props) {
    scriptProperties.setProperty(key, props[key]);
  }
  return `✅ ${Object.keys(props).length} 個のプロパティを設定しました`;
}
