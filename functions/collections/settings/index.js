const { firestore } = require("../../config");

const fetchSettings = async () => {
  const settings = await firestore.doc("settings/default").get();
  return settings.data();
};

const fetchSettingsLanding = async () => {
  const settings = await firestore.doc("settings/landing").get();
  return settings.data();
};

const updateSetting = async (settingId, setting) => await firestore.doc(`settings/${settingId}`).update(setting);

const fetchTemplate = async (templateName) => {
  const templates_ = await firestore.doc("settings/templates").get();
  const templateData = templates_.data();

  if (templateData) return templateData[templateName].content;
};

module.exports = { fetchSettings, updateSetting, fetchTemplate, fetchSettingsLanding };
