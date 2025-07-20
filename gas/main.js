function onFormSubmit(e) {
  const accessToken = getAccessToken();
  const sheetUrl = getProp('SPREADSHEET_URL');
  const message = `📝 ヒヤリハット報告書が追加されました。\n確認はこちら👇\n${sheetUrl}`;
  sendMessageToRoom(accessToken, message);
}
