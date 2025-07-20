function sendMessageToRoom(token, text) {
  const botId = getProp('BOT_ID');
  const channelId = getProp('CHANNEL_ID');
  const clientId = getProp('CLIENT_ID');
  const url = `https://www.worksapis.com/v1.0/bots/${botId}/channels/${channelId}/messages`;

  const payload = JSON.stringify({
    content: {
      type: 'text',
      text: text
    }
  });

  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${token}`,
      consumerKey: clientId
    },
    payload: payload,
    muteHttpExceptions: true
  });

  Logger.log(`📦 ステータスコード: ${res.getResponseCode()}`);
  Logger.log(`📄 レスポンス内容:\n${res.getContentText()}`);
}
