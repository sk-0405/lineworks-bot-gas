function getProp(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function setProperty(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value);
  Logger.log(`✅ ${key} を設定しました`);
}
