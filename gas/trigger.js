function createOnFormSubmitTrigger() {
  const sheetId = getProp('SPREADSHEET_ID');
  const spreadsheet = SpreadsheetApp.openById(sheetId);

  const triggers = ScriptApp.getProjectTriggers();
  const exists = triggers.some(trigger => trigger.getHandlerFunction() === 'onFormSubmit');

  if (!exists) {
    ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(spreadsheet)
      .onFormSubmit()
      .create();
    Logger.log(`✅ onFormSubmit トリガーを作成しました`);
  } else {
    Logger.log('✅ 既に onFormSubmit トリガーが存在します');
  }
}
